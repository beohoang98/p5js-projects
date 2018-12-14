const FRAME_RATE = 1;

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
        return 1 / FRAME_RATE;
    }


    constructor(x = 0, y = 0, radius = 5, direction = 45) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.direction = direction;
        this.aliveTime = 0;
        this.point = 0;

        this.adn = new ADN(Ball.PREDICTION_LINE.length, -10, 10);
        this.adn.randomize();

        this.collider = new CircleCollider(this.x, this.y, this.radius, "ball");
        this.collider.onCollider((collider) => {
            if (collider.tag === "target") {
                this.point = this.aliveTime;
            } else if (collider.tag === "wall") {
                // this.point = -this.aliveTime;
                this.changeDirection(this.adn.elements.reduce((val, a)=>val+a));
            } else if (collider.tag !== "ball") {
                
            }
        });
    }

    destroy() {
        this.collider.destroy();
    }

    move() {
        if (this.point !== 0)
            return;
        const rad = this.direction * Math.PI / 180;
        this.x += Ball.SPEED * Math.cos(rad);
        this.y += Ball.SPEED * Math.sin(rad);
        this.collider.update(this.x, this.y);
        ++this.aliveTime;

        if (this.x > width || this.x < 0 || this.y > height || this.y < 0)
            this.point = -1; 
    }

    changeDirection(steer) {
        this.direction += steer;
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

    /**
     * @param {Ball} ball
     * @return {Ball} child of two
     */
    mergeWith(ball) {
        const child = new Ball(0, 0, this.radius, this.direction); // because
        child.adn = ADN.merge(this.adn, ball.adn);
        return child;
    }
}