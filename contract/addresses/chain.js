exports.NETWORKS = {
	GOERLI_TESTNET: {
		chainId: 5,
		hexChainId: "0x38",
		blockExplorerUrls: ["https://goerli.etherscan.io/"],
		metadata: {
			chainName: "Goerli Testnet",
			shortName: "GoerliETH",
			image:
				"https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg",
		},
		nativeCurrency: {
			name: "ETH",
			symbol: "ETH",
			decimals: 18,
		},
	},
	BSC_TESTNET: {
		chainId: 97,
		hexChainId: "0xfa",
		blockExplorerUrls: ["https://bscscan.com/"],
		metadata: {
			chainName: "BSC Testnet",
			shortName: "BSC",
			image: "https://umbria.network/assets/images/icon/bsclogo.png?v1",
		},
		nativeCurrency: {
			name: "BNB",
			symbol: "BNB",
			decimals: 18,
		},
	},
};

exports.getNetworkInfo = (chainId) => {
	if (chainId == NETWORKS.GOERLI_TESTNET.chainId)
		return NETWORKS.GOERLI_TESTNET;
	else if (chainId == NETWORKS.BSC_TESTNET.chainId) return NETWORKS.BSC_TESTNET;
	// else throw Error("Invalid network");
	return undefined;
};
