use solana_program::{ pubkey::Pubkey, program_pack::{ IsInitialized, Sealed } };
use borsh::{ BorshSerialize, BorshDeserialize };

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct State {
  pub is_initialized: bool,
}

impl Sealed for State {}

impl IsInitialized for State {
  fn is_initialized(&self) -> bool {
    self.is_initialized
  }
}