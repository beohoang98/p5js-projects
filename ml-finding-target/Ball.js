class Ball {
    static get PREDICTION_LINE() {
        return [
            -90, // left
            -45, // forward left
            45, // forward right
            90, // right
        ]
    }
    static get SPEED() {
        return 5 / 10;
    }


    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.direction = 0;
        this.aliveTime = 0;
        this.point = 0;

        this.adn = new ADN(Ball.PREDICTION_LINE.length, -10, 10);
        this.collider = new CircleCollider(this.x, this.y, this.radius);
        this.collider.onCollider((collider) => {
            if (collider.tag === "target") {
                this.point = this.aliveTime;
            } else if (collider.tag === "wall") {
                this.point = -this.aliveTime;
            }
        });
    }

    move() {
        if (this.point !== 0)
            return;
        const rad = this.direction * Math.PI / 180;
        this.x += Ball.SPEED * Math.cos(rad);
        this.y += Ball.SPEED * Math.sin(rad);
        this.collider.update(this.x, this.y);
        ++this.aliveTime;
    }

    draw() {
        if (this.point !== 0) {
            return;
        }

        push();

        noStroke();
        fill(color('#0045cc'));
        ellipse(this.x, this.y, this.radius, this.radius);

        pop();
    }
}