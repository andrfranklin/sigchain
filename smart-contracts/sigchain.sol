// contract address 0xA2B2954E1268365727184f561c02A823d27AC5ad

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "./document.sol";

contract Sigchain {
    struct GetDocumentDto {
        string key;
        string name;
        uint datetime;
    }
    address payable owner;
    Document[] documents;
    uint price;

    constructor() public {
        owner = msg.sender;
        price = 1;
    }

    modifier onlyPaying {
        require(msg.value > price, "Valor insuficiente para realizar a acao!");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Acao restrita ao admin!");
        _;
    }

    event message(address person, string did, string document);

    function getAllDocuments() public view onlyOwner returns (Document[] memory){
        return documents;
    }

    function newDocument(string calldata _key, string calldata _name, address[] calldata _subscribers) external payable onlyPaying{
        for(uint i = 0; i < documents.length; i++){
            if(keccak256(abi.encodePacked(_key)) == keccak256(abi.encodePacked(documents[i].key()))){
                require(false, "Documento já existe");
            }
        }
        Document temp = new Document(msg.sender, _key, _name, _subscribers);
        documents.push(temp);
        emit message(msg.sender, "criou e assinou", _key);
    }

    function documetExist(string memory _key) public view returns (bool){
        for(uint i = 0; i < documents.length; i++){
            if(keccak256(bytes(documents[i].key())) == keccak256(bytes(_key)) && documents[i].waitingSignatureBy(msg.sender)){
                return true;
            }
        }
        return false;
    }

    function assingDocument(string calldata _key) external payable onlyPaying {
        require(documetExist(_key) == true, "Documento nao existe" );
        for(uint i = 0; i < documents.length; i++){
            if(keccak256(bytes(documents[i].key())) == keccak256(bytes(_key)) && documents[i].waitingSignatureBy(msg.sender)){
                documents[i].assing(msg.sender);
            }
        }
        emit message(msg.sender, "assinou", _key);
    }

    function getAllByOwner() public view returns (GetDocumentDto[] memory){
        uint count = 0;
        for(uint i = 0; i < documents.length; i++){
            if(msg.sender == documents[i].owner()){
                count++;
            }
        }
        GetDocumentDto[] memory myDocuments = new GetDocumentDto[](count);
        uint position = 0;
        for(uint i = 0; i < documents.length; i++){
            if(msg.sender == documents[i].owner()){
                myDocuments[position] = GetDocumentDto(documents[i].key(), documents[i].name(), documents[i].datetime());
                position++;
            }
        }
        return myDocuments;
    }

    function getMyUnsignedDocuments() public view returns (GetDocumentDto[] memory){
        uint count = 0;
        for(uint i = 0; i < documents.length; i++){
            if(documents[i].waitingSignatureBy(msg.sender)){
                count++;
            }
        }

        uint position = 0;
        GetDocumentDto[] memory myDocuments = new GetDocumentDto[](count);
        for(uint i = 0; i < documents.length; i++){
            if(documents[i].waitingSignatureBy(msg.sender)){
                myDocuments[position] = GetDocumentDto(documents[i].key(),documents[i].name(),documents[i].datetime());
                position++;
            }
        }
        return myDocuments;
    }

    function getMySignedDocuments() public view returns (GetDocumentDto[] memory){
        uint count = 0;
        for(uint i = 0; i < documents.length; i++){
            if(documents[i].signedBy(msg.sender)){
                count++;
            }
        }
        uint position = 0;
        GetDocumentDto[] memory myDocuments = new GetDocumentDto[](count);
        for(uint i = 0; i < documents.length; i++){
            if(documents[i].signedBy(msg.sender)){
                myDocuments[position] = GetDocumentDto(documents[i].key(), documents[i].name(), documents[i].datetime());
                position++;
            }
        }
        return myDocuments;
    }
}