const schema = {
    register: {
        country: {
            type: String,
            required: true,
            length: {
                min: 1,
                max: 50
            }          
        }
    },
    withdraw: {
        receiveBankName: {
            type: String,
            required: true,
            length: {
                min: 1,
                max: 50
            }          
        },
        receiveCountry: {
            type: String,
            required: true,
            length: {
                min: 1,
                max: 50
            }          
        }
    }
};

module.exports = schema;