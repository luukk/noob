const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const middleware = require('./middleware')
const messages = require('./messages')
require('dotenv').config()

io.on("connection", socket => {
    console.log("a user connected", socket.id);

    middleware(socket); // middleware handler

    const { unknownIp, registerSucces, registerFailed, alreadyRegistered } = messages.register
    
    const ip = socket.handshake.address.split(':').slice(-1)[0]
    const country = process.env[ip]

    if (country === undefined) {
        return socket.emit('response', unknownIp);
    }

    socket.join(country, error => {
        const poolSize = io.sockets.adapter.rooms[country];

        if(poolSize.length > 1) {
            socket.leave(country);
            return socket.emit('response', alreadyRegistered);
        }
        if(error !== null){                
            return socket.emit('response', registerFailed); // error registering to room
        }
        return socket.emit('response', registerSucces); // register successfull
    });

    socket.on("withdraw", withdrawBody => {
        const { receiveCountry } = withdrawBody.header        
        socket.to(receiveCountry).emit('withdraw', withdrawBody)
    })

    socket.on('response', responseBody => {
        const { receiveCountry } = withdrawBody.header        
        socket.to(receiveCountry).emit('reponse', responseBody)
    })

    socket.on("balance", balanceBody => {
        const { receiveCountry } = balanceBody.header
        socket.to(receiveCountry).emit('balance', balanceBody)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

app.set("port", 8085);
server.listen(app.get("port"), function() {
    console.log(`Listening on ${server.address().port}`);
});
