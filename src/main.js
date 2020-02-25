import Client from './client'

const client1 = new Client("Netherlands"); 
const client2 = new Client("Germany"); 
const client3 = new Client("Netherlands"); 

class Yeet {
    constructor() {
        client1.connect();
        client2.connect();
        client3.connect();
        // client1.withdraw('yoink', 'Germany', 20);
    }
}

const test = new Yeet();

export default test;