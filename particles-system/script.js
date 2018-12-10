const particles = [];
const TEXT_SIZE = 28;

function setup() {
    createCanvas(640, 480);
    background(0);
    frameRate(60);
    textSize(TEXT_SIZE);

    particles.push(new Particle());
}

function draw() {
    background(0);
    fill(255);
    text("Particles: " + particles.length, TEXT_SIZE, TEXT_SIZE + TEXT_SIZE);

    updateParticles();
    if (particles.length < PARTICLE_NUM) {
        for (let i = 0; i < PARTICLE_NUM/PARTICLE_LIFE; ++i)
            particles.push(new Particle());
    }

    drawParticles();
}

function updateParticles()
{
    for (let i = 0, len = particles.length; i < len; ++i) {
        particles[i].update();
        if (particles[i].finished()) {
            particles.splice(i, 1);
            --len;
        }
    }
}

function drawParticles()
{
    for (let i = 0, len = particles.length; i < len; ++i) {
        particles[i].draw();
    }
}