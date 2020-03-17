const schema = {
    register: {
        header: {
            country: {
                type: String,
                required: true,
                length: {
                    min: 1,
                    max: 50
                }          
            }
        }
    },
    withdraw: {
        header: {
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
    },
    balance: {
        header: {
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
    }
};

module.exports = schema;