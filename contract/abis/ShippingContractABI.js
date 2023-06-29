exports.ShippingContractABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_roleContractAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_supplyChainContractAddress",
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
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "orderId",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "sender",
						type: "address",
					},
					{
						internalType: "address",
						name: "carrier",
						type: "address",
					},
					{
						internalType: "address",
						name: "receiver",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "pickupDate",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deliveryDate",
						type: "uint256",
					},
					{
						internalType: "enum IShipping.ShippingStatus",
						name: "status",
						type: "uint8",
					},
				],
				indexed: false,
				internalType: "struct IShipping.Shipment",
				name: "orderDetails",
				type: "tuple",
			},
			{
				indexed: false,
				internalType: "address",
				name: "creator",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "createdDate",
				type: "uint256",
			},
		],
		name: "ShippingOrderCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "orderId",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "sender",
						type: "address",
					},
					{
						internalType: "address",
						name: "carrier",
						type: "address",
					},
					{
						internalType: "address",
						name: "receiver",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "pickupDate",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "deliveryDate",
						type: "uint256",
					},
					{
						internalType: "enum IShipping.ShippingStatus",
						name: "status",
						type: "uint8",
					},
				],
				indexed: false,
				internalType: "struct IShipping.Shipment",
				name: "orderDetails",
				type: "tuple",
			},
			{
				indexed: false,
				internalType: "address",
				name: "updater",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "updatedDate",
				type: "uint256",
			},
		],
		name: "ShippingOrderUpdated",
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
		inputs: [
			{
				internalType: "uint256",
				name: "_orderId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "_sender",
				type: "address",
			},
			{
				internalType: "address",
				name: "_carrier",
				type: "address",
			},
			{
				internalType: "address",
				name: "_receiver",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_pickupDate",
				type: "uint256",
			},
		],
		name: "createShipment",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "roleContract",
		outputs: [
			{
				internalType: "contract Roles",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "shipmentCounter",
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
				name: "",
				type: "uint256",
			},
		],
		name: "shipmentList",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				internalType: "address",
				name: "carrier",
				type: "address",
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "pickupDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deliveryDate",
				type: "uint256",
			},
			{
				internalType: "enum IShipping.ShippingStatus",
				name: "status",
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
				name: "_orderId",
				type: "uint256",
			},
		],
		name: "shipmentOfOrder",
		outputs: [
			{
				internalType: "uint256[]",
				name: "orderIds",
				type: "uint256[]",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_shipmentId",
				type: "uint256",
			},
		],
		name: "sign",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "supplyChainContract",
		outputs: [
			{
				internalType: "contract SupplyChain",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_shipmentId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_deliveryDate",
				type: "uint256",
			},
			{
				internalType: "enum IShipping.ShippingStatus",
				name: "_status",
				type: "uint8",
			},
		],
		name: "updateShipment",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_shipmentId",
				type: "uint256",
			},
		],
		name: "viewShipment",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "orderId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "sender",
				type: "address",
			},
			{
				internalType: "address",
				name: "carrier",
				type: "address",
			},
			{
				internalType: "address",
				name: "receiver",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "pickupDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "deliveryDate",
				type: "uint256",
			},
			{
				internalType: "enum IShipping.ShippingStatus",
				name: "status",
				type: "uint8",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];
