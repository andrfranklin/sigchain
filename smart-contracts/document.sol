pragma solidity ^0.5.0;

contract Document {
    string public key;
    string public name;
    address public owner;
    address[] public signatures;
    uint public datetime;
    address[] waitingSignature;

    constructor (address _owner, string memory _key, string memory _name, address[] memory _subscribers) public {
        key = _key;
        owner = _owner;
        name = _name;
        waitingSignature = _subscribers;
        signatures.push(_owner);
        datetime = now;
    }

    function amISubscriber(address _subscriber) public view returns (bool){
        for(uint i = 0; i < waitingSignature.length; i++){
            if(_subscriber == waitingSignature[i]){
                return true;
            }
        }
        return false;
    }

    function assing(address _subscriber) public {
        require(amISubscriber(_subscriber) == true, "Voce nao e um assinante!");
        for(uint i = 0; i < waitingSignature.length; i++){
            if(_subscriber == waitingSignature[i]){
                bool hasSignature = false;
                for(uint j = 0; j < signatures.length; j++){
                    if(_subscriber == signatures[i]){
                        hasSignature = true;
                    }
                }
                if(!hasSignature){
                    signatures.push(_subscriber);
                    delete waitingSignature[i];
                }
            }
        }
    }

    function signedBy(address person) public view returns (bool){
        bool isSigned = false;
        for(uint i = 0; i < signatures.length; i++){
            if(signatures[i] == person){
                isSigned = true;
            }    
        }
        return isSigned;
    }

    function waitingSignatureBy(address person) public view returns (bool){
        bool isWaiting = false;
        for(uint i = 0; i < waitingSignature.length; i++){
            if(waitingSignature[i] == person){
                isWaiting = true;
            }    
        }
        return isWaiting;
    }

}
