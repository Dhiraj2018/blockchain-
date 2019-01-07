
const Block =  require ('./index').Block;
const Blockchain =  require ('./index').Blockchain;


let dhirajCoin = new Blockchain();
dhirajCoin.addBlock(new Block(1,"10/07/2017",{ amount: 4}))
dhirajCoin.addBlock(new Block(2,"10/07/2017",{ amount: 4}))


// console.log('the block valid? '+ dhirajCoin.isChainValid());

dhirajCoin.chain[1].data ={ amount: 100};
// console.log('the block valid? '+ dhirajCoin.isChainValid());
dhirajCoin.chain[1].hash= dhirajCoin.chain[1].calculateHash();
console.log('the block valid? '+ dhirajCoin.isChainValid());
console.log(JSON.stringify(dhirajCoin, null, 4));
