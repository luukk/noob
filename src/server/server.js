const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const middleware = require('./middleware')
const messages = require('./messages')

io.on("connection", socket => {
    console.log("a user connected", socket.id);

    middleware(socket); //middleware handler

    /**
     * Socket handler for country registration
     */
    socket.on("register", ({ country }) => {
        socket.countryInfo = country;
        const { registerSucces, registerFailed, alreadyRegistered } = messages.register
    
        socket.join(country, error => {
            const poolSize = io.sockets.adapter.rooms[country];

            if(poolSize.length > 1) {
                socket.leave(country);
                return socket.emit('response', alreadyRegistered);
            }
            if(error !== null){                
                return socket.emit('response', registerFailed); //error registering to room
            }
            
            return socket.emit('response', registerSucces); //register successfull
        });

    })

    socket.on("withdraw", socket => {
        const { receiveBankName, receiveBankCountry, amount } = socket
        let foundClients = [];

        const getAllClientsInRoom = (error, clients) => {
            if(error) {
                console.log("error", error)
            }
            console.log(clients)
            foundClients = clients;
            return clients;
        }
        
        const clients = io.of('/').in('Germany').clients(getAllClientsInRoom);

        const findClientById = id => {
            return clients.find( id => {
                const bankId = io.sockets.connected[id].id
                return bankId == id
            })
            .bankInfo
        }

        console.log("clients", foundClients)
    })

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

app.set("port", 8085);
server.listen(app.get("port"), function() {
    console.log(`Listening on ${server.address().port}`);
});
