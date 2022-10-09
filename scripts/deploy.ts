import { ethers } from "hardhat";

async function main() {
  const acceptanceThreshold = 1000;

  const W3HF = await ethers.getContractFactory("W3HF");
  const w3hf = await W3HF.deploy(acceptanceThreshold);

  await w3hf.deployed();

  console.log(`W3HF deployed to ${w3hf.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
