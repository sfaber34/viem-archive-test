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

try {
  const blockHash = await getBlockHash(currentBlockNumber);

  console.log(`Current Block Number:\t${currentBlockNumber}`);
  console.log(`Current Block Hash:\t${blockHash}`);
} catch (error) {
  console.error(`Current Block Error:\t${error}`);
}

try {
  const blockNumberBack10000 = currentBlockNumber - BigInt(10000);
  const blockHashBack10000 = await getBlockHash(blockNumberBack10000);

  console.log(`Block Number Back 10000:\t${blockNumberBack10000}`);
  console.log(`Block Hash Back 10000:\t${blockHashBack10000}`);
} catch (error) {
  console.error(`Back 10000 Block Error:\t${error}`);
}

try {
  const blockNumberBack20000 = currentBlockNumber - BigInt(20000);
  const blockHashBack20000 = await getBlockHash(blockNumberBack20000);

  console.log(`Block Number Back 20000:\t${blockNumberBack20000}`);
  console.log(`Block Hash Back 20000:\t${blockHashBack20000}`);
} catch (error) {
  console.error(`Back 20000 Block Error:\t${error}`);
}
