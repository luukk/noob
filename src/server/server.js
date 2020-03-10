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
    socket.on("register", registerbody => {
        const { country } = registerbody.header
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

    socket.on("withdraw", withdrawBody => {
        const { receiveCountry } = withdrawBody.header        
        socket.to(receiveCountry).emit('withdraw', withdrawBody)
    })

    socket.on("deposit", depositBody => {
        const { receiveCountry } = depositBody.header
        socket.to(receiveCountry).emit('deposit', depositBody)
    })

    socket.on("balance", balanceBody => {
        const { receiveCountry } = balanceBody.header
        socket.to(receiveCountry).emit('balance', balanceBody)
    })

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

app.set("port", 8085);
server.listen(app.get("port"), function() {
    console.log(`Listening on ${server.address().port}`);
});
