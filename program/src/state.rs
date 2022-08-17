use borsh::{ BorshSerialize, BorshDeserialize };
use solana_program::{ program_pack::{ Sealed } };

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct ApplicationState {
  pub gif_count: u64,
}

impl Sealed for ApplicationState {}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GifState {
  pub url: String,
}

impl Sealed for GifState {}