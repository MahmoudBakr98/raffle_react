import CONTRACT_API from "./RaffleAPI.json";
import type { Raffle } from "./types/RaffleAPIType";

const CONTRACT_ADDRESS = "0x4d75DBF4E759D848D157519B23888b0D9B974a74"; // Sepolia
// const CONTRACT_ADDRESS = "0x0165878a594ca255338adfa4d48449f69242eb8f"; // hardhat

export type { Raffle };

export { CONTRACT_ADDRESS, CONTRACT_API };
