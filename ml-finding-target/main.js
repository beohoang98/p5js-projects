/**
 * @type {Ball[]}
 */
const BallList = [];
const WallList = [];

const target = new Target(400, 300, 10);
const BALL_NUM = 70;
const WALL_NUM = 5;
const TEST_TIME = 10; // 10 seconds 
let frameCount = 0;
let testTimeCount = 0;

function setup() {
    createCanvas(800, 600);
    background(0);
    // frameRate(100000);
    frameCount = 0;
    testTimeCount = 0;
    for (let i = 0; i < BALL_NUM; ++i) {
        BallList[i] = new Ball(0, 0);
        BallList[i].direction = 45 + Math.random() * 30 - 15;
    }
    for (let i = 0; i < WALL_NUM; ++i) {
        const wx = Math.floor(Math.random()*200 + 200);
        const wy = Math.floor(Math.random()*200 + 200);
        WallList[i] = new Wall(wx, wy, 20);
    }
}

function update() {
    for (let i = 0; i < BallList.length; ++i) {
        BallList[i].move();
    }
    Collider.checkAll();
}

function draw() {
    update();
    ++frameCount;
    testTimeCount += performance.now();

    if (frameCount >= 10) {
        frameCount = 0;

        background(0);
        for (let i = 0; i < BALL_NUM; ++i) {
            BallList[i].draw();
        }
        for (let i = 0; i < WALL_NUM; ++i) {
            WallList[i].draw();
        }
        target.draw();
    }
}