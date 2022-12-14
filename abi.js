var abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "person",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "document",
				"type": "string"
			}
		],
		"name": "message",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			}
		],
		"name": "assingDocument",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			}
		],
		"name": "documetExist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllByOwner",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "key",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "datetime",
						"type": "uint256"
					}
				],
				"internalType": "struct Sigchain.GetDocumentDto[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllDocuments",
		"outputs": [
			{
				"internalType": "contract Document[]",
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMySignedDocuments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "key",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "datetime",
						"type": "uint256"
					}
				],
				"internalType": "struct Sigchain.GetDocumentDto[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyUnsignedDocuments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "key",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "datetime",
						"type": "uint256"
					}
				],
				"internalType": "struct Sigchain.GetDocumentDto[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_key",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "_subscribers",
				"type": "address[]"
			}
		],
		"name": "newDocument",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
]