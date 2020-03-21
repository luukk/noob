import socketio

io = socketio.Client()

io.connect('http://192.168.1.145:8085')

@io.event
def response(data):
    print(data)

@io.event
def withdraw(data):
    # Handle your withdraw request and respond
    print(data)
    response = {
        'header': { 
            'originCountry': 'TE0',
            'originBank': 'INGB',
            'receiveCountry': data['header']['originCountry'],
            'receiveBank': data['header']['originBank'],
            'action': 'withdraw'
        },
        'body': {
            'code': 200,
            'message': 'Success'
        }
    }
    io.emit('response', response)
    # io.emit('withdraw', response) werkt dus wel

withdrawBody = {
    'header': { 
	    'originCountry': 'TE0',
	    'originBank': 'INGB',
        'receiveCountry': 'TE1',
        'receiveBank': 'INGB'
    },
    'body': {
        'pin': '1234',
        'account': '123456',
        'acmount': 123.45
    }
}

io.emit('withdraw', withdrawBody)