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

async function getAddressBalance(blockNumber) {
  const balance = await localClient.getBalance({
    address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    blockNumber: blockNumber,
  });
  return balance;
}

const currentBlockNumber = await getCurrentBlockNumber();

try {
  const blockHash = await getBlockHash(currentBlockNumber);
  const balance = await getAddressBalance(currentBlockNumber);
  // const balanceBack10000 = await getAddressBalance(blockNumberBack10000);

  console.log(`Current Block Number:\t${currentBlockNumber}`);
  console.log(`Current Block Hash:\t${blockHash}`);
  console.log(`Current Address Balance:\t${balance / BigInt(10 ** 18)} ETH`);
  // console.log(
  //   `Balance 10000 Blocks Ago:\t${balanceBack10000 / BigInt(10 ** 18)} ETH`
  // );
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
