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
let dungeon;

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
    dungeon = new Array(9);
    for (var i = 0; i < 9; i++) {
        dungeon[i] = new Array(9);
    }
    DunGenStart();
    console.log(dungeon)

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

function DunGenStart() {
    var room = new Room(4, 4, [true,true,true,true])

    dungeon[4][4] = room; //save room at location

    ctx.save()
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'black'
    ctx.fillRect(room.down*50+900,room.right*50,45,45)
    ctx.strokeRect(room.down*50+900,room.right*50,45,45)
    ctx.restore()

    for (let i = 0; i < 4; i++) {
        DunGen(room, i);
    }
}

//opening determines which way the room is oriented
function DunGen(previous, opening) {
    var room = new Room(previous.right, previous.down, determinePaths(opening))

    switch (opening) {
        case 0: //up
            room.down--;
            break;
        case 1: //right
            room.right++;
            break;
        case 2: //down
            room.down++;
            break;
        case 3: //left
            room.right--;
            break;
    }

    dungeon[room.right][room.down] = room; //save room at location, SOMETIMES CAUSES BUGS?

    for (let i = 0; i < 4; i++) {
        if (room.paths[i]) {
            DunGen(room, i);
        }
    }

    ctx.save()
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect(room.right*50+900,room.down*50,45,45)
    ctx.strokeRect(room.right*50+900,room.down*50,45,45)
    ctx.restore()
}

function determinePaths(entry) {
    let temp;
    let arr = [false,false,false,false]
    switch (Math.floor(Math.random() * 10)) {
        case 0: case 1: case 2: case 3:
            temp = [false,false,false,false]
            break;
        case 4:
            temp = [false,true,true,false]
            break;
        case 5:
            temp = [false,true,false,true]
            break;
        case 6:
            temp = [false,false,true,true]
            break;
        case 7:
            temp = [false,false,false,true]
            break;
        case 8:
            temp = [false,true,false,false]
            break;
        case 9:
            temp = [false,false,true,false]
            break;
    }
    for (let i = 0; i < 4; i++) {
        arr[(entry + i) % 4] = temp[i]
    }
    return arr;
}

class Room {
    constructor(right, down, paths) {
        this.right = right;
        this.down = down;
        this.paths = paths;
    }
}

draw();