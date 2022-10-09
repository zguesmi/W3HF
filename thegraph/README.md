## Subgraph for the W3HF dapp

Install thegraph CLI
```
npm install --save @graphprotocol/graph-cli
```

Create subgraph
```
$ npx graph init \
        --contract-name W3HF \
        --index-events \
        --product hosted-service \
        --from-contract 0xf71682c7Cc551570c61b078e3DB7E02f87a24BAA \
        --abi ../contracts/artifacts/contracts/W3HF.sol/W3HF.json \
        --network mumbai \
        zguesmi/w3hf

✔ Protocol · ethereum
✔ Subgraph name · zguesmi/w3hf
✔ Directory to create the subgraph in · w3hf
✔ Ethereum network · mumbai
✔ Contract address · 0xf71682c7Cc551570c61b078e3DB7E02f87a24BAA
✔ ABI file (path) · ../contracts/artifacts/contracts/W3HF.sol/W3HF.json
✔ Contract Name · W3HF
———
  Generate subgraph
  Write subgraph to directory
✔ Create subgraph scaffold
✔ Initialize networks config
✔ Initialize subgraph repository
✔ Install dependencies with npm install
✔ Generate ABI and schema types with npm run codegen
✔ Add another contract? (y/N) · false

Subgraph zguesmi/w3hf created in w3hf

Next steps:

  1. Run `graph auth` to authenticate with your deploy key.

  2. Type `cd w3hf` to enter the subgraph.

  3. Run `npm run deploy` to deploy the subgraph.

Make sure to visit the documentation on https://thegraph.com/docs/ for further information.
```

Authenticate:
```
$ npx graph auth --product hosted-service                                                                                                              ✔ 
✔ Deploy key · ****************************************
Deploy key set for https://api.thegraph.com/deploy/
```

Deploy subgraph:
```
$ npx graph deploy --product hosted-service zguesmi/w3hf
```