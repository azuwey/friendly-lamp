use solana_program::{ pubkey::Pubkey, program_pack::{ IsInitialized, Sealed } };
use borsh::{ BorshSerialize, BorshDeserialize };

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct State {}

impl Sealed for State {}
