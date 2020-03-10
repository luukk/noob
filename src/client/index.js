import io from "socket.io-client";

class Client {
    constructor(country) {
        console.log('constructor called');
        
        this.registerSchema = {
            header: {
                country
            }
        }
    }

    connect() {
        console.log('connect')
        this.socket = io("http://localhost:8085");

        this.socket.emit('register', this.registerSchema)

        this.socket.on('response', function(data) {
            console.log('received by node: ', data)
        })

        this.socket.on('withdraw', function(data) {
            console.log('withdraw by node: ', data)
        })

        this.socket.on('balance', function(data) {
            console.log('balance quest by node: ', data)
        })

        this.socket.on('error', function(err) {
            console.log(err)
            // alert(JSON.stringify(err, null, 4));
        })
        
    }

    withdraw(receiveBankName, receiveCountry, amount) {
        let schema = {}
        schema.header = { receiveBankName, receiveCountry }
        schema.body = amount
        schema.action = "withdraw"

        this.socket.emit('withdraw', schema);
        this.socket.on('message', function(data) {
            console.log('withdraw by node: ', data)
        })
    }

    balance(receiveBankName, receiveCountry) {
        let schema = {}
        schema.header = { receiveBankName, receiveCountry }
        schema.action = "balance"

        this.socket.emit('balance', schema);
        this.socket.on('message', function(data) {
            console.log('balance asked: ', data)
        })
    }
}

export default Client;