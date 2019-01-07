 const SHA256 = require('crypto-js/sha256')

//Specify the block class and its elements
 class Block{
    constructor(index, timestamp,data, previousHash=''){
     this.index = index,
     this.timestamp = timestamp,
     this.data = data,
     this.previousHash = previousHash,
     this.hash= this.calculateHash(),
     this.nonce = 0
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }
    //Proof of concept to mine a block
    minedBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){  
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block Mined: "+ this.hash);
        
    }
}

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty = 1;
    }
    createGenesisBlock(){
        return new Block(0,"01/01/2017","Genesis block","0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.minedBlock(this.difficulty);
        this.chain.push(newBlock)
    }
    isChainValid(){
        for(let i=2;i<this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            } else{
                if(currentBlock.previousHash !== previousBlock.hash){
                    return false;
                }
            }
            return true;
        }
    }
}

module.exports = {

    Blockchain: Blockchain,
    Block:Block
}



let dhirajCoin = new Blockchain();

console.log('Mining Block 1 .....');
dhirajCoin.addBlock(new Block(1,"10/07/2017",{ amount: 4}))

console.log('Mining Block 2 ....');
dhirajCoin.addBlock(new Block(2,"10/07/2017",{ amount: 4}))


// // console.log('the block valid? '+ dhirajCoin.isChainValid());

// dhirajCoin.chain[1].data ={ amount: 100};
// // console.log('the block valid? '+ dhirajCoin.isChainValid());
// dhirajCoin.chain[1].hash= dhirajCoin.chain[1].calculateHash();
// console.log('the block valid? '+ dhirajCoin.isChainValid());
console.log(JSON.stringify(dhirajCoin, null, 4));

