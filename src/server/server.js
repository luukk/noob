const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);

io.on("connection", socket => {
    console.log("a user connected", socket.id);

    socket.on("register", registerInformation => {
        socket.bankInfo = registerInformation;
        const { country } = registerInformation;

        socket.join(country, error => {
            if(error !== null){                
                return socket.emit('response', { code :'400', message: "unsuccesfull registration" }); //error registering to room
            }
            
            return socket.emit('response', { code :'201', message: "succesfull registration" }); //register successfull
        });

    })

    socket.on("withdraw", socket => {
        const getAllClientsInRoom = (error, clients) => {
            if(error) {
                console.log("error", error)
            }

            return clients;
        }

        const findClientById = id => {
            return clients.find( id => {
                const bankId = io.sockets.connected[id].id
                return bankId == id
            })
            .bankInfo
        }

        io.of('/').in('Netherlands').clients(test);
    })

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

app.set("port", 8080);
server.listen(app.get("port"), function() {
    console.log(`Listening on ${server.address().port}`);
});
