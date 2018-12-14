class Target {
    static get DEFAULT_SIZE() {return 10};
    
    constructor(x = 0,  y = 0, size = Target.DEFAULT_SIZE) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.collider = new CircleCollider(x, y, size, "target");
    }
    
    respawn(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    draw() {
        push();

        noStroke();
        fill(color('#cc4500'));
        ellipse(this.x, this.y, this.size, this.size);

        pop();
    }
}

class Wall {
    constructor(x, y, size = Target.DEFAULT_SIZE) {
        this.x = x;
        this.y = y;
        this.radius = size;
        this.collider = new CircleCollider(x, y, size, "wall");
    }

    respawn(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    draw() {
        push();
        fill(color("#fff"));
        ellipse(this.x, this.y, this.radius, this.radius);
        pop();
    }
}