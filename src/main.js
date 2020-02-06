import Client from './client'

const client1 = new Client("abn", "Netherlands"); 
const client2 = new Client("yoink", "Germany"); 

class Yeet {
    constructor() {
        client1.connect();
        client2.connect();
    }
}

const test = new Yeet();

export default test;