//Make Connection
var socket = io.connect();

//Query DOM


//Emit events
MessageChannel.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 87: case 65: case 83: case 68: case 38: case 37: case 40: case 39:
            socket.emit('move', {
                direction: keyCode
            })
    }
})