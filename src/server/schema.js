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
        receiveBankCountry: {
            type: String,
            required: true,
            length: {
                min: 1,
                max: 50
            }          
        },
        amount: {
            type: Number,
            required: true
        }
    }
};

module.exports = schema;