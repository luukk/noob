const Validator = require('schema-validator')
const schema = require('./schema')
const encryption = require('./encryption')

const middelwareHandler = socket => {
    socket.use((packet,next) => {
        const actionName = packet[0]
        const socketBody = packet[1]
        encryption.decryptHeader(socketBody)
        console.log(socketBody)
        
        if (typeof schema[actionName] !== 'undefined') {
            const validator = new Validator(schema[actionName]);

            const validatedSocketBody = validator.check(socketBody);

            if(validatedSocketBody._error) {
                return next(new Error(JSON.stringify(validatedSocketBody))) // return validation error
            }
        }
        
        next();
    })
}

module.exports = middelwareHandler;
