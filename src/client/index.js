import io from "socket.io-client";

class Client {
    constructor(name, country) {
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
            console.log('received by node: ', data)
        })

        this.socket.on('error', function(err) {
            console.log(err)
            // alert(JSON.stringify(err, null, 4));
        })
        
    }

    withdraw(receiveBankName, receiveBankCountry, amount) {
        const schema = { receiveBankName, receiveBankCountry, amount}

        this.socket.emit('withdraw', schema);
    }
}

export default Client;