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
        console.log('connect')
        this.socket = io("http://localhost:8080");

        this.socket.emit('register', this.registerSchema)

        this.socket.on('response', function(data) {
            console.log('received by node: ', data)
        })
        
    }

    withdraw(receiveBankName, receiveBankCountry, amount) {
        const schema = { receiveBankName, receiveBankCountry, amount}

        this.socket.emit('withdraw', schema);
    }
}

export default Client;