class Tile {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    static drawTile(ctx) {
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
}

class Empty extends Tile {
    static character = 'X';
    static fill = 'black';
    static stroke = 'black';

    constructor(x,y) {
        super(x,y)
    }
}

class Wall extends Tile {
    static character = 'W';
    static fill = 'black';
    static stroke = 'grey';

    constructor(x,y) {
        super(x,y)
    }
}

class Floor extends Tile {
    static character = 'W';
    static fill = 'grey';
    static stroke = 'silver';

    constructor(x,y) {
        super(x,y)
    }
}