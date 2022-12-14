use solana_program::{ program_error::ProgramError };
use thiserror::Error;

#[derive(Debug, Error)]
pub enum ApplicationError {
  #[error("Not writeable account")]
  NotWriteableAccount,
}

impl From<ApplicationError> for ProgramError {
  fn from(e: ApplicationError) -> Self {
    ProgramError::Custom(e as u32)
  }
}