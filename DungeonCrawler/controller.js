//Make Connection
//var socket = io.connect();

//Query DOM
let map;
let playerLocation = [10,2]; //right, down

//Emit events
MessageChannel.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 87: case 38: //UP
            playerLocation[1]--;
            break;
        case 65: case 37: //LEFT
            playerLocation[0]--;
            break;
        case 83: case 40: //DOWN
            playerLocation[1]++;
            break;
        case 68: case 39: //RIGHT
            playerLocation[0]++;
            break;
    }
    console.log(playerLocation)
})



function draw() {
    let canv = document.querySelector('#canv');
    let ctx = canv.getContext('2d');
    map = ["XXXXXWWWWWWWWWXXXXX","XXXXXWOOOOOOOWXXXXX","XXXXXWOOOOPOOWXXXXX","XXXXXWOOEOOOOWXXXXX","XXXXXWWWOOOWWWXXXXX","XXXXXWOOOOOOOWXXXXX","XXXWWWOWWWWWOWWWXXX","WWWWOOOOOWOOOOOWWWW","WOOWOOOOOWOOOOOWOOW","WOOOOOOOOWOOOOOOOOW","WOOWOOOOOWOOOOOWOOW","WWWWOOOOOWOOOOOWWWW","XXXWWWOWWWWWOWWWXXX","XXXXXWOWOOOWOWXXXXX","XXXXXWOOOOOOOWXXXXX","XXXXXWWWOOOWWWXXXXX","XXXXXXXWWWWWXXXXXXX"];

    ctx.save()
    ctx.translate(0,0)
    ctx.scale(1,1)
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            switch (map[i].charAt(j)) {
                case 'X' :
                    ctx.fillStyle = 'black'
                    ctx.strokeStyle = 'black'
                    break;
                case 'O' :
                    ctx.fillStyle = 'grey'
                    ctx.strokeStyle = 'silver'
                    break;
                case 'W' :
                    ctx.fillStyle = 'black'
                    ctx.strokeStyle = 'grey'
                    break;
                default :
                    ctx.fillStyle = 'grey'
                    ctx.strokeStyle = 'silver'
            }
            
            ctx.fillRect(j*50,i*50,22,22)
            ctx.strokeRect(j*50,i*50,22,22)
            ctx.fillRect(j*50+25,i*50,22,22)
            ctx.strokeRect(j*50+25,i*50,22,22)
            ctx.fillRect(j*50,i*50+25,22,22)
            ctx.strokeRect(j*50,i*50+25,22,22)
            ctx.fillRect(j*50+25,i*50+25,22,22)
            ctx.strokeRect(j*50+25,i*50+25,22,22)
        }
    }
    ctx.restore()

    ctx.save()
    ctx.scale(1,1)
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let circle = true;
            switch(map[i].charAt(j)) {
                case 'E' :
                    ctx.fillStyle = 'maroon'
                    ctx.strokeStyle = 'red'
                    break;
                case 'T' :
                    ctx.fillStyle = 'white'
                    ctx.strokeStyle = 'white'
                    break;
                case 'P' :
                    ctx.fillStyle = 'navy'
                    ctx.strokeStyle = 'aqua'
                    break;
                default :
                    circle = false;
            }
            if (circle) {
                ctx.beginPath()
                ctx.arc(j*50+23,i*50+23,22,0, Math.PI * 2, true)
                ctx.stroke()
                ctx.fill()
            }    
        }
    }
    ctx.restore()
}

function makeMap(mapFile) {
    const fs = require('fs')

    fs.readFile(mapFile, (err, data) => {
        if (err) throw err;

        map = data.split('\n')
    })
}

draw();

