const hash = require('crypto-js/sha256');

class Block{
    constructor(prevHash, data){
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date();
        this.hash = this.caculatorHash() 
        this.seed = 0
    }
    caculatorHash(){
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp + this.seed).toString()
    } 
    mine(difficulty){
        while(!this.hash.startsWith('0'.repeat(difficulty))){
            this.seed ++
            this.hash=this.caculatorHash()
        }
    }
}
class Blockchain{
    constructor(difficulty){
        const genesisBlock = new Block('0000', {isGeneis: true})
        this.difficulty=difficulty
        this.chain = [genesisBlock]
    }
    getLastBlock(){
        let lengthChain = this.chain.length
        return this.chain[lengthChain-1]
    }
    addBlock(data){
        const lastBlock = this.getLastBlock()
        const newBlock = new Block(lastBlock.hash, data)
        console.log("start")
        console.time("mine")
        newBlock.mine(this.difficulty)
        this.chain.push(newBlock)
        console.timeEnd("mine")
        console.log("end")
    }
    isValid(){
        for(let i=1; i < this.chain.length;i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1]
            if(currentBlock.hash !== currentBlock.caculatorHash()){
                return false;
            }
            if(currentBlock.prevHash !== prevBlock.hash){
                return false;
            }
            
        }
        return true;
    }
}

const ethereum = new Blockchain(3)
ethereum.addBlock({from: "Manh", to:"Vietinbank"})
ethereum.addBlock({from: "Thoa", to:"Techcombank"})
ethereum.addBlock({from: "Thu", to:"Vietcombank"})
console.log(ethereum)


