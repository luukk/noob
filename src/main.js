import Client from './client'
import publicNoob from '../keys/NOOB.pub.js';

const client1 = new Client("Netherlands", publicNoob); 
const client2 = new Client("Germany", publicNoob); 
// const client3 = new Client("Poland"); 

class Yeet {
    constructor() {
        client1.connect();
        client2.connect();
        // client3.connect();
        // client3.withdraw("abn","Netherlands", 20)
    }
}

const test = new Yeet();

export default test;