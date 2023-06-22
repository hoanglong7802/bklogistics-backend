exports.PricingContractABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "addCarrier",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "addMember",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_roleContractAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_productContractAddress",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addedDate",
				type: "uint256",
			},
		],
		name: "CarrierAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "removedDate",
				type: "uint256",
			},
		],
		name: "CarrierRemoved",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "addedDate",
				type: "uint256",
			},
		],
		name: "MemberAdded",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "removedDate",
				type: "uint256",
			},
		],
		name: "MemberRemoved",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_price",
				type: "uint256",
			},
			{
				internalType: "bool",
				name: "_list",
				type: "bool",
			},
			{
				internalType: "uint8",
				name: "_type",
				type: "uint8",
			},
			{
				internalType: "enum Pricing.Unit",
				name: "_unit",
				type: "uint8",
			},
		],
		name: "modifyPrice",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "address",
				name: "updater",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "enum Pricing.PriceType",
				name: "priceType",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "enum Pricing.Unit",
				name: "unit",
				type: "uint8",
			},
		],
		name: "PriceUpdated",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "removeCarrier",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "removeMember",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "renounceCarrier",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "renounceMember",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "previousAdminRole",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "bytes32",
				name: "newAdminRole",
				type: "bytes32",
			},
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				indexed: true,
				internalType: "address",
				name: "account",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address",
			},
		],
		name: "RoleRevoked",
		type: "event",
	},
	{
		inputs: [],
		name: "ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "CARRIER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_id",
				type: "uint256",
			},
			{
				internalType: "enum Pricing.PriceType",
				name: "_type",
				type: "uint8",
			},
		],
		name: "getPrice",
		outputs: [
			{
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{
				internalType: "enum Pricing.Unit",
				name: "unit",
				type: "uint8",
			},
			{
				internalType: "bool",
				name: "isListed",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
		],
		name: "getRoleAdmin",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes32",
				name: "role",
				type: "bytes32",
			},
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "hasRole",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "isCarrier",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
		],
		name: "isMember",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "MEMBER_ROLE",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "bytes4",
				name: "interfaceId",
				type: "bytes4",
			},
		],
		name: "supportsInterface",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
