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

console.log(`Current Block Number:\t${currentBlockNumber}`);
console.log(`Current Block Hash:\t${blockHash}`);

const blockNumberBack10000 = currentBlockNumber - BigInt(10000);
const blockHashBack10000 = await getBlockHash(blockNumberBack10000);

console.log(`Block Number Back 10000:\t${blockNumberBack10000}`);
console.log(`Block Hash Back 10000:\t${blockHashBack10000}`);
