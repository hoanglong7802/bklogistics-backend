exports.SupplyChainABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_roleContract",
				type: "address",
			},
			{
				internalType: "address",
				name: "_productContract",
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
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "cancelledAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "enum ISupplyChain.OrderStatus",
				name: "prevStatus",
				type: "uint8",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "cancelledDate",
				type: "uint256",
			},
		],
		name: "OrderCancelled",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "customer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "address[]",
				name: "suppliers",
				type: "address[]",
			},
			{
				indexed: false,
				internalType: "address[]",
				name: "manufacturers",
				type: "address[]",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "createdDate",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "creator",
				type: "address",
			},
		],
		name: "OrderCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "payer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "paymentDate",
				type: "uint256",
			},
		],
		name: "OrderPaid",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "updatedAddress",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "updatedDate",
				type: "uint256",
			},
		],
		name: "OrderUpdated",
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
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "_paySteakHolders",
		outputs: [],
		stateMutability: "payable",
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
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_account",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "addPrice",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "cancelOrder",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "confirmOrder",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "enum SupplyChain.OrderRole",
				name: "",
				type: "uint8",
			},
		],
		name: "confirmPermission",
		outputs: [
			{
				internalType: "enum ISupplyChain.OrderStatus",
				name: "statusSet",
				type: "uint8",
			},
			{
				internalType: "enum ISupplyChain.OrderStatus",
				name: "prevStatus",
				type: "uint8",
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
			{
				internalType: "address",
				name: "_customer",
				type: "address",
			},
			{
				internalType: "address[]",
				name: "_supplier",
				type: "address[]",
			},
			{
				internalType: "address[]",
				name: "_manufacturer",
				type: "address[]",
			},
		],
		name: "createOrder",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "deposit",
		outputs: [],
		stateMutability: "payable",
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
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "getTotalPrice",
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
				internalType: "address[]",
				name: "_arr",
				type: "address[]",
			},
			{
				internalType: "address",
				name: "_address",
				type: "address",
			},
		],
		name: "isIncludeAddress",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "pure",
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
		inputs: [
			{
				internalType: "address[]",
				name: "_suppliers",
				type: "address[]",
			},
			{
				internalType: "address[]",
				name: "_manufacturers",
				type: "address[]",
			},
			{
				internalType: "address",
				name: "_customer",
				type: "address",
			},
			{
				internalType: "address",
				name: "_sender",
				type: "address",
			},
		],
		name: "isStakeHolder",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "pure",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "payOrder",
		outputs: [],
		stateMutability: "payable",
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
		name: "renounce",
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
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "viewOrder",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "productId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "customer",
				type: "address",
			},
			{
				internalType: "address[]",
				name: "suppliers",
				type: "address[]",
			},
			{
				internalType: "address[]",
				name: "manufacturers",
				type: "address[]",
			},
			{
				internalType: "uint256",
				name: "createdDate",
				type: "uint256",
			},
			{
				internalType: "enum ISupplyChain.OrderStatus",
				name: "status",
				type: "uint8",
			},
			{
				internalType: "bool",
				name: "isPaid",
				type: "bool",
			},
			{
				internalType: "uint256",
				name: "deposited",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
