use borsh::{ BorshDeserialize };
use solana_program::{ program_error::ProgramError };

pub enum ApplicationInstruction {
  AddGif {
    url: String,
  },
}

#[derive(BorshDeserialize)]
pub struct ApplicationInstructionPayload {
  url: String,
}

impl ApplicationInstruction {
  pub fn unpack(instruction_data: &[u8]) -> Result<Self, ProgramError> {
    let (&instruction_variant, rest) = instruction_data
      .split_first()
      .ok_or(ProgramError::InvalidInstructionData)?;
    let payload: ApplicationInstructionPayload =
      ApplicationInstructionPayload::try_from_slice(rest).unwrap();

    Ok(match instruction_variant {
      0 =>
        Self::AddGif {
          url: payload.url,
        },
      _ => {
        return Err(ProgramError::InvalidInstructionData);
      }
    })
  }
}