use solana_program::{
  account_info::{ AccountInfo, next_account_info },
  entrypoint::ProgramResult,
  pubkey::Pubkey,
  program_error::ProgramError,
  rent::Rent,
  sysvar::Sysvar,
  msg,
  system_instruction,
};
use borsh::{ BorshSerialize, BorshDeserialize };
use solana_program::program::invoke_signed;
use crate::error::ApplicationError;
use crate::instruction::{ ApplicationInstruction };
use crate::state::{ ApplicationState, GifState };

pub struct ApplicationProcessor;
impl ApplicationProcessor {
  pub fn process(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
  ) -> ProgramResult {
    let instruction = ApplicationInstruction::unpack(instruction_data)?;
    match instruction {
      ApplicationInstruction::AddGif { url } => {
        return Self::add_gif(program_id, accounts, url);
      }
    }
  }

  fn add_gif(program_id: &Pubkey, accounts: &[AccountInfo], url: String) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let authority_account = next_account_info(accounts_iter)?;
    let application_account = next_account_info(accounts_iter)?;
    let gif_account = next_account_info(accounts_iter)?;
    let system_program = next_account_info(accounts_iter)?;

    if !authority_account.is_signer {
      msg!("Authority account is not a signer");
      return Err(ProgramError::InvalidAccountData);
    }

    if application_account.owner != program_id {
      msg!("Application account does not owned by the program");
      return Err(ProgramError::IllegalOwner);
    }

    if !application_account.is_writable {
      msg!("Application account not writeable");
      return Err(ApplicationError::NotWriteableAccount.into());
    }

    let (program_derived_account, program_account_bump) = Pubkey::find_program_address(
      &[b"application".as_ref(), authority_account.key.as_ref()],
      &program_id
    );

    if program_derived_account != *application_account.key {
      msg!("Invalid seeds for application account");
      return Err(ProgramError::InvalidSeeds);
    }

    if gif_account.owner != program_id {
      msg!("GIF account does not owned by the program");
      return Err(ProgramError::IllegalOwner);
    }

    if !gif_account.is_writable {
      msg!("GIF account not writeable");
      return Err(ApplicationError::NotWriteableAccount.into());
    }

    let mut application_state: ApplicationState = ApplicationState::try_from_slice(
      &application_account.data.borrow()
    )?;

    let slug = format!("slug-{}", application_state.gif_count + 1);
    let (gif_derived_account, _) = Pubkey::find_program_address(
      &[b"gif".as_ref(), slug.as_ref(), authority_account.key.as_ref()],
      &program_id
    );

    if gif_derived_account != *gif_account.key {
      msg!("Invalid seeds for application account");
      return Err(ProgramError::InvalidSeeds);
    }

    let gif_len: usize = 4 + url.len();

    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(gif_len);

    let create_gif_pda = &system_instruction::create_account(
      authority_account.key,
      gif_account.key,
      rent_lamports,
      gif_len.try_into().unwrap(),
      program_id
    );

    invoke_signed(
      create_gif_pda,
      &[authority_account.clone(), application_account.clone(), system_program.clone()],
      &[
        &[
          b"application".as_ref(),
          slug.as_ref(),
          authority_account.key.as_ref(),
          &[program_account_bump],
        ],
      ]
    )?;

    let gif_state: GifState = GifState {
      url,
    };
    gif_state.serialize(&mut &mut gif_account.data.borrow_mut()[..])?;
    msg!("${:?}", gif_account.data);

    application_state.gif_count += 1;
    application_state.serialize(&mut &mut application_account.data.borrow_mut()[..])?;
    msg!("${:?}", application_account.data);

    return Ok(());
  }
}

#[cfg(test)]
mod test {
  use super::*;
  use solana_program::clock::Epoch;
  use crate::state::GifState;

  #[test]
  fn test_sanity() {
    let system_id = Pubkey::default();
    let program_id = Pubkey::new_unique();
    let authority_account_key = Pubkey::new_unique();

    let mut application_account_lamports = 0;
    let mut application_account_data: Vec<u8> = (ApplicationState {
      gif_count: 0,
    })
      .try_to_vec()
      .unwrap();
    let (program_derived_application_account, _) = Pubkey::find_program_address(
      &[b"application".as_ref(), authority_account_key.as_ref()],
      &program_id
    );
    let application_account = AccountInfo::new(
      &program_derived_application_account,
      false,
      true,
      &mut application_account_lamports,
      &mut application_account_data,
      &program_id,
      false,
      Epoch::default()
    );

    let mut gif_account_lamports = 0;
    let mut gif_account_data: Vec<u8> = (GifState {
      url: "".to_string(),
    })
      .try_to_vec()
      .unwrap();
    let (program_derived_gif_account, _) = Pubkey::find_program_address(
      &[b"gif".as_ref(), format!("slug-{}", 1).as_ref(), authority_account_key.as_ref()],
      &program_id
    );
    let gif_account = AccountInfo::new(
      &program_derived_gif_account,
      false,
      true,
      &mut gif_account_lamports,
      &mut gif_account_data,
      &program_id,
      false,
      Epoch::default()
    );

    let mut authority_account_lamports = 0;
    let mut authority_account_data = Vec::new();
    let authority_account = AccountInfo::new(
      &authority_account_key,
      true,
      false,
      &mut authority_account_lamports,
      &mut authority_account_data,
      &system_id,
      false,
      Epoch::default()
    );

    let mut system_account_lamports = 0;
    let mut system_account_data = Vec::new();
    let asd = AccountInfo::new(
      &system_id,
      true,
      false,
      &mut system_account_lamports,
      &mut system_account_data,
      &system_id,
      false,
      Epoch::default()
    );
    let accounts = vec![
      authority_account,
      application_account,
      gif_account,
    ];

    ApplicationProcessor::add_gif(
      &program_id,
      &accounts,
      "insert_a_giphy_link_here".to_string()
    ).expect("");
    let new_state: ApplicationState = ApplicationState::try_from_slice(
      &accounts[1].data.borrow()
    ).unwrap();
    assert_eq!(new_state.gif_count, 1);
    // assert_eq!(new_state.urls.len(), 1);
  }
}