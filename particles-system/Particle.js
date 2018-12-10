const PARTICLE_SIZE = 15;
const PARTICLE_NUM = 300;
const PARTICLE_LIFE = 100;

class Particle {

    constructor() {
        this.x = mouseX;
        this.y = mouseY;
        this.Vx = 0;
        this.Vy = (Math.random()) * 0.3; 
        this.alpha = 255;

        this.size = PARTICLE_SIZE;
    }

    update() {
        this.Vx = this.Vx * 0.6 + (Math.random() - 0.5)*this.alpha/255;
        this.x += this.Vx;
        this.y += this.Vy;
        this.Vy -= 0.04;
        this.alpha -= 255 / PARTICLE_LIFE;
    }

    draw() {
        if (this.alpha < 0) return;
        const mcolor = Math.round(this.alpha * 40 / 255) + 10;

        push();
        
        noStroke();
        fill(color(`hsla(${mcolor}, 100%, 50%, ${this.alpha / 510})`));
        // hsl(0, 0, 255, this.alpha);
        ellipse(this.x, this.y - this.Vy, PARTICLE_SIZE);
        
        fill(color(`hsla(${mcolor}, 100%, 50%, ${this.alpha / 255})`));
        ellipse(this.x, this.y, PARTICLE_SIZE * 2/3);

        pop();
    }

    finished() {
        return (this.alpha < 0);
    }
}