import socketio

io = socketio.Client()

io.connect('http://localhost:8085')

@io.event
def response(data):
    print(data)

@io.event
def withdraw(data):
    # Handle your withdraw request and respond
    print(data)
    response = {
        'header': { 
            'receiveCountry': data.receiveCountry,
            'receiveBank': data.receiveBank,
            'action': 'withdraw'
        },
        'body': {
            'code': 200,
            'message': 'Success'
        }
    }
    io.emit('response', response)

withdrawBody = {
    'header': { 
        'receiveCountry': 'Nederland',
        'receiveBank': 'INGB'
    },
    'body': {
        'pin': '1234',
        'account': '123456',
        'acmount': 123.45
    }
}

io.emit('withdraw', withdrawBody)