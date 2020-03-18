const messages = {
    register: {
        registerSucces: { 
            code: "201", 
            message: "succesfull registration"
        },
        registerFailed: { 
            code: "409", 
            message: "registration failed"
        },
        unknownIp: { 
            code: "400", 
            message: "the ip of the request is unknown"
        },
        alreadyRegistered: { 
            code: "400", 
            message: "already registered"
        }
    }
}

module.exports = messages;
