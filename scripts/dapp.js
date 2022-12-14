// ENDEREÇO EHTEREUM DO CONTRATO
var contractAddress = "0xA2B2954E1268365727184f561c02A823d27AC5ad";

// Inicializa o objeto DApp
document.addEventListener("DOMContentLoaded", onDocumentLoad);
function onDocumentLoad() {
  DApp.init().then(() => {
    getAllDocuments();
  });
  
}

// Nosso objeto DApp que irá armazenar a instância web3
const DApp = {
  web3: null,
  contracts: {},
  account: null,

  init: function () {
    return DApp.initWeb3();
  },

  // Inicializa o provedor web3
  initWeb3: async function () {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          // Requisita primeiro acesso ao Metamask
          method: "eth_requestAccounts",
        });
        DApp.account = accounts[0];
        window.ethereum.on("accountsChanged", DApp.updateAccount); // Atualiza se o usuário trcar de conta no Metamaslk
      } catch (error) {
        console.error("Usuário negou acesso ao web3!");
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    } else {
      console.error("Instalar MetaMask!");
      return;
    }
    return DApp.initContract();
  },

  // Atualiza 'DApp.account' para a conta ativa no Metamask
  // updateAccount: async function () {
  //   DApp.account = (await DApp.web3.eth.getAccounts())[0];
  //   atualizaInterface();
  // },

  // Associa ao endereço do seu contrato
  initContract: async function () {
    DApp.contracts.Sigchain = new DApp.web3.eth.Contract(abi, contractAddress);
    return DApp.render();
  },

  // Inicializa a interface HTML com os dados obtidos
  render: async function () {
    console.log(myContracts());
    // inicializaInterface();
  },
};


function myContracts() {
  return DApp.contracts.Sigchain.methods.getAllByOwner().call();
}

function mySignedDocuments() {
  return DApp.contracts.Sigchain.methods.getMySignedDocuments().call();
}

function myUnsignedDocuments() {
  return DApp.contracts.Sigchain.methods.getMyUnsignedDocuments().call();
}

function documentExists(documentHash) {
  return DApp.contracts.Sigchain.methods.documetExist().call({_key: documentHash});
}

function newDocument(_key, _name, _subscribers = []) {
  return DApp.contracts.Sigchain.methods.newDocument().call({_key, _name, _subscribers});
}

function assignDocument(_key) {
  return DApp.contracts.Sigchain.methods.assingDocument().call({_key});
}