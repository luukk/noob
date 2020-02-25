const messages = {
    register: {
        registerSucces: { code: "201", message: "succesfull registration"},
        registerFailed: { code: "409", message: "registration failed"},
        alreadyRegistered: { code: "400", message: "already registered"}
    }
}

module.exports = messages;
