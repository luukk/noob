import io from "socket.io-client";

class Client {
    connect() {

        this.socket = io("http://localhost:8080");
    }
}

export default Client;