exports.ProductContractABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "materialId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "address",
				name: "adder",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addedDate",
				type: "uint256",
			},
		],
		name: "MaterialAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "address",
				name: "adder",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addedDate",
				type: "uint256",
			},
		],
		name: "ProductAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "remover",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "removeDate",
				type: "uint256",
			},
		],
		name: "ProductRemoved",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
		],
		name: "addMaterial",
		outputs: [
			{
				internalType: "uint256",
				name: "materialId",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
		],
		name: "addProduct",
		outputs: [
			{
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_productId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_materialId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_quantity",
				type: "uint256",
			},
			{
				internalType: "enum Products.Unit",
				name: "_unit",
				type: "uint8",
			},
		],
		name: "addRequiredMaterial",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_materialId",
				type: "uint256",
			},
		],
		name: "getMaterial",
		outputs: [
			{
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_productId",
				type: "uint256",
			},
		],
		name: "getProduct",
		outputs: [
			{
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_productId",
				type: "uint256",
			},
		],
		name: "getRequiredMaterial",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "materialId",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "quantity",
						type: "uint256",
					},
					{
						internalType: "enum Products.Unit",
						name: "unit",
						type: "uint8",
					},
				],
				internalType: "struct Products.MaterialPair[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "materialCounter",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "productCounter",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_productId",
				type: "uint256",
			},
		],
		name: "removeProduct",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_materialId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
		],
		name: "updateMaterial",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_productId",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
		],
		name: "updateProduct",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
