import io from "socket.io-client";

class Client {
    constructor(country) {
        console.log('constructor called');
        
        this.registerSchema = {
            country
        }
    }

    connect() {
        console.log('connect')
        this.socket = io("http://localhost:8085");

        this.socket.emit('register', this.registerSchema)

        this.socket.on('response', function(data) {
            console.log('here is recieved by node')
            console.log('received by node: ', data)
        })

        this.socket.on('message', function(data) {
            console.log('withdraw by node: ', data)
        })

        this.socket.on('error', function(err) {
            console.log(err)
            // alert(JSON.stringify(err, null, 4));
        })
        
    }

    withdraw(receiveBankName, receiveCountry, amount) {
        const schema = { receiveBankName, receiveCountry, amount }
        schema.action = "withdraw"

        this.socket.emit('withdraw', schema);
        this.socket.on('message', function(data) {
            console.log('withdraw by node: ', data)
        })
    }

    balance(receiveBankName, receiveCountry) {
        const schema = { receiveBankName, receiveCountry }
        schema.action = "balance"

        this.socket.emit('balance', schema);
        this.socket.on('message', function(data) {
            console.log('balance asked: ', data)
        })
    }
}

export default Client;