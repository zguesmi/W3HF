require("dotenv").config()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    networks: {
        mumbai: {
            url: process.env.MUMBAI_RPC_URL || "",
            accounts:
                process.env.MUMBAI_PRIVATE_KEY !== undefined ? [process.env.MUMBAI_PRIVATE_KEY] : [],
        },
    },
};

export default config;
