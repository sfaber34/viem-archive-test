import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const localClient = createPublicClient({
  name: "localClient",
  chain: mainnet,
  transport: http("http://localhost:8545"),
});

async function getCurrentBlockNumber() {
  const blockNumber = await localClient.getBlockNumber();
  return blockNumber;
}

async function getBlockHash(blockNumber) {
  const block = await localClient.getBlock({ blockNumber });
  return block.hash;
}

const currentBlockNumber = await getCurrentBlockNumber();
const blockHash = await getBlockHash(currentBlockNumber);
console.log(`Scaffold RPC is on block\t${currentBlockNumber}`);
console.log(`Block hash:\t${blockHash}`);
