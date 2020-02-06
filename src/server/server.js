const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);

io.on("connection", socket => {
    console.log("a user connected", socket.id);

    socket.on("register", data => {
        const { name, country} = data;
        const roomName = name.concat(country);

        console.log('register called', typeof name, country);
        
        socket.join(roomName);
        
        console.log("rooms", io.sockets.adapter.rooms);
    })

    socket.on("disconnect", function() {
        console.log("user disconnected");
    });
});

app.set("port", 8080);
server.listen(app.get("port"), function() {
    console.log(`Listening on ${server.address().port}`);
});
