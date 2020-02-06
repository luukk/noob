import io from "socket.io-client";

class Client {
    constructor(name, country) {
        console.log('constructor called');
        
        this.registerSchema = {
            name,
            country
        }
    }
    connect() {

        this.socket = io("http://localhost:8080");

        this.socket.emit('register', this.registerSchema)
    }
}

export default Client;