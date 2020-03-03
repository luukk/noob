import io from "socket.io-client";
const crypto = require('crypto')

class Client {
    constructor(country, publicKeyNoob) {
        console.log('constructor called');
        
        this.publicKeyNoob = publicKeyNoob

        this.registerSchema = {
            country
        }

        this.encryptedRegistration = Buffer.from(String(this.registerSchema), "base64")
        crypto.publicEncrypt(this.publicKeyNoob, this.encryptedRegistration)
    }

    connect() {
        console.log('connect')
        this.socket = io("http://localhost:8085");

        this.socket.emit('register', this.encryptedRegistration)

        this.socket.on('response', function(data) {
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
}

export default Client;