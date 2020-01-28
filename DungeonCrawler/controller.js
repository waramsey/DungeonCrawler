//Make Connection
//var socket = io.connect();

//Query DOM
let canv = document.querySelector('#canv');
let ctx = canv.getContext('2d');

let map = [['X','X','X','X','X','W','W','W','W','W','W','W','W','W','X','X','X','X','X'],['X','X','X','X','X','W','O','O','O','O','O','O','O','W','X','X','X','X','X'],['X','X','X','X','X','W','O','O','O','O','O','O','O','W','X','X','X','X','X'],['X','X','X','X','X','W','O','O','O','O','O','O','O','W','X','X','X','X','X'],['X','X','X','X','X','W','W','W','O','O','O','W','W','W','X','X','X','X','X'],['X','X','X','X','X','W','O','O','O','O','O','O','O','W','X','X','X','X','X'],['X','X','X','W','W','W','O','W','W','W','W','W','O','W','W','W','X','X','X'],['W','W','W','W','O','O','O','O','O','W','O','O','O','O','O','W','W','W','W'],['W','O','O','W','O','O','O','O','O','W','O','O','O','O','O','W','O','O','W'],
['W','O','O','O','O','O','O','O','O','W','O','O','O','O','O','O','O','O','W'],
['W','O','O','W','O','O','O','O','O','W','O','O','O','O','O','W','O','O','W'],
['W','W','W','W','O','O','O','O','O','W','O','O','O','O','O','W','W','W','W'],
['X','X','X','W','W','W','O','W','W','W','W','W','O','W','W','W','X','X','X'],
['X','X','X','X','X','W','O','W','O','O','O','W','O','W','X','X','X','X','X'],
['X','X','X','X','X','W','O','O','O','O','O','O','O','W','X','X','X','X','X'],
['X','X','X','X','X','W','W','W','O','O','O','W','W','W','X','X','X','X','X'],
['X','X','X','X','X','X','X','W','W','W','W','W','X','X','X','X','X','X','X']]
//Map has to be a 2d array...

let pLoc = [2,12]; //right, down

//Emit events
document.body.addEventListener('keyup', function(event) {
    var XorY, moveX = 0, moveY = 0;
    switch (event.keyCode) {
        case 87: case 38: //UP
            XorY = 0, moveX = -1;
            break;
        case 65: case 37: //LEFT
            XorY = 1, moveY = -1;
            break;
        case 83: case 40: //DOWN
            XorY = 0, moveX = 1;
            break;
        case 68: case 39: //RIGHT
            XorY = 1, moveY = 1;
            break;
        default: return;
    }
    drawTile(pLoc[0], pLoc[1],'grey','silver')
    pLoc[XorY] = map[pLoc[0] + moveX][pLoc[1] + moveY] != 'W' ? pLoc[XorY] + moveX + moveY : pLoc[XorY];
    moveEntity(pLoc[0],pLoc[1],'navy','aqua')
})



function draw() {
    
    var fill, stroke;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            switch (map[i][j]) {
                case 'X' :
                    fill = 'black'
                    stroke = 'black'
                    break;
                case 'O' :
                    fill = 'grey'
                    stroke = 'silver'
                    break;
                case 'W' :
                    fill = 'black'
                    stroke = 'grey'
                    break;
                default :
                    fill = 'grey'
                    stroke = 'silver'
            }
            
            drawTile(i,j,fill,stroke)
        }
    }

    ctx.save()
    ctx.scale(1,1)
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            let circle = true;
            switch(map[i][j]) {
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

function moveEntity(x,y,fill,stroke) {
    ctx.save()

    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    ctx.beginPath()
    ctx.arc(y*50+23,x*50+23,22,0, Math.PI * 2, true)
    ctx.stroke()
    ctx.fill()

    ctx.restore()
}

function drawTile(x,y,fill,stroke) {
    ctx.save()

    ctx.clearRect(y*50,x*50,49,49)

    ctx.fillStyle = fill
    ctx.strokeStyle = stroke
    ctx.fillRect(y*50,x*50,22,22)
    ctx.strokeRect(y*50,x*50,22,22)
    ctx.fillRect(y*50+25,x*50,22,22)
    ctx.strokeRect(y*50+25,x*50,22,22)
    ctx.fillRect(y*50,x*50+25,22,22)
    ctx.strokeRect(y*50,x*50+25,22,22)
    ctx.fillRect(y*50+25,x*50+25,22,22)
    ctx.strokeRect(y*50+25,x*50+25,22,22)

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