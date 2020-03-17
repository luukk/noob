import Client from './client'

const client1 = new Client("Netherlands"); 
const client2 = new Client("Germany"); 
const client3 = new Client("Poland"); 

class Yeet {
    constructor() {
        client1.connect();
        client2.connect();
        client3.connect();
        client2.withdraw("abn","Netherlands", 20)
        client2.deposit("abn","Netherlands", 20)
        client1.balance("abn", "Germany")
    }
}

const test = new Yeet();

export default test;