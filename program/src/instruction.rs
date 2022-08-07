use borsh::{ BorshDeserialize };
use solana_program::{ program_error::ProgramError, pubkey::Pubkey };

pub enum Instruction {}

#[derive(BorshDeserialize)]
pub struct InstructionPayload {}

impl Instruction {
  pub fn unpack(instruction_data: &[u8]) -> Result<Self, ProgramError> {
    let (&instruction_variant, rest) = instruction_data
      .split_first()
      .ok_or(ProgramError::InvalidInstructionData)?;
    let payload = InstructionPayload::try_from_slice(rest).unwrap();

    Ok(match instruction_variant {
      _ => {
        return Err(ProgramError::InvalidInstructionData);
      }
    })
  }
}