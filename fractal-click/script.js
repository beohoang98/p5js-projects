const fractalParticles = [];
const FRATAL_PARTICLE_LIFE = 10;
const FRATAL_PARTICLE_STEP = 2;

let oldMX, oldMY;

const PARTICLE_DIV = [
    [0.618, 1.618 * 40], 
    [0.8, 1.618 * 10], 
    [0.618 * 0.8, - 1.618 * 10]
];

function setup() {
	createCanvas(800, 600);
	background(0);
	frameRate(60);
    angleMode(DEGREES);
    textSize(16);
    strokeWeight(2);

    oldMX = mouseX;
    oldMY = mouseY;
}

function draw() {
	background(0, 0, 0, 8);
	
	stroke(128, 128, 128, 128);
    line(oldMX, oldMY, mouseX, mouseY, 10, 10);
    oldMX = mouseX; oldMY = mouseY;
	
    processingParticles();
    
    fill(128, 0, 250);
    rect(0, 0, 800, 32)
    fill(255);
    text("Particles: " + fractalParticles.length, 32, 16);
}

function mouseClicked() {drawOnClick();}
function mouseDragged() {drawOnClick();}

function drawOnClick() {
    const initialDir = Math.random() * 360;
    const randomNum = Math.round(Math.random() * 6.18 + 1);
    for (let i =0; i < randomNum; ++i) {
        const randomLife = FRATAL_PARTICLE_LIFE * (1 - Math.random() * 0.618);
        fractalParticles.push(new Particle(mouseX, mouseY, initialDir + (i + 1) * 360 / randomNum, randomLife));
    }
}

function Particle(startX, startY, startDirection, life) {
	this.startX = startX;
	this.startY = startY;
	this.direction = startDirection;
	this.endX = startX + cos(startDirection) * life * FRATAL_PARTICLE_STEP;
    this.endY = startY + sin(startDirection) * life * FRATAL_PARTICLE_STEP;
    this.life = life;
	
	this.draw = () => {
        push();

		if (this.life < 1) return;
		console.log("Draw particle");
		
        stroke(250,
            0,
            this.life * 255 / FRATAL_PARTICLE_LIFE,
            200);
        strokeWeight(this.life / 2);
		line(this.startX, this.startY, this.endX, this.endY);
        noStroke();
        
        pop();
	}
	
	this.next = () => {
		if (this.life < 1) return;
		console.log(`Create more ${PARTICLE_DIV.length} particle`);
        
        for (const div of PARTICLE_DIV) {
            const part = new Particle(this.endX, this.endY, this.direction + div[1], this.life * div[0]);
            // debugger;
            fractalParticles.push(part);
        }
	}
}

function processingParticles() {
	let len = fractalParticles.length;
	console.log("Particles: " + len);
	
	while (len > 0) {
		const part = fractalParticles.shift();
		--len;
		
		part.draw();
        part.next();
        
        delete part;
	}
}