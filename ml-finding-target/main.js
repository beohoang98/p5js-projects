/**
 * @type {Ball[]}
 */
const BallList = [];

/**
 * @type {Wall[]}
 */
const WallList = [];

const target = new Target(400, 300, 10);
const BALL_NUM = 50;
const WALL_NUM = 15;
const TEST_TIME = 10; // 10 seconds 
let frameCount = 0;
let testTimeCount = 0;

function setup() {
    createCanvas(800, 600, WEBGL);
    background(0);
    frameRate(60);
    frameCount = 0;
    testTimeCount = 0;
    setAttributes('antialias', true);
    for (let i = 0; i < BALL_NUM; ++i) {
        BallList[i] = new Ball(0, 0);
        BallList[i].direction = Math.random() * 90;
    }
    for (let i = 0; i < WALL_NUM; ++i) {
        const wx = Math.random()*width;
        const wy = Math.random()*height;
        WallList[i] = new Wall(wx, wy);
    }
}

function update() {
    Collider.checkAll();
    for (let i = 0; i < BallList.length; ++i) {
        BallList[i].move();
    }
}

function draw() {
    update();
    ++frameCount;
    testTimeCount += performance.now();

    if (frameCount >= FRAME_RATE) {
        frameCount = 0;

        background(0);
        translate(-width/2, -height/2);
        
        for (let i = 0; i < BALL_NUM; ++i) {
            BallList[i].draw();
        }
        for (let i = 0; i < WALL_NUM; ++i) {
            WallList[i].draw();
        }
        target.draw();
    }
}

function stopAndMerge() {
    noLoop();

    const Pool = [];
    BallList.sort((a, b) => {
        return b.point - a.point; // DESC
    });

    console.table(BallList.slice(0, 10)); // top 10

    while (BallList.length > 0 && Pool.length < BALL_NUM) {
        if (BallList.length >= 1) {
            let ranId = Math.floor(Math.random() * (BallList.length - 1) + 1);
            Pool.push(BallList[0].mergeWith(BallList[ranId]));
            Pool.push(BallList[ranId].mergeWith(BallList[0]));
            BallList[0].destroy();
            BallList[ranId].destroy();
            BallList.splice(0, 1);
            BallList.splice(ranId, 1);
        } else {
            Pool.push(BallList[0]);
            BallList[0].destroy();
            BallList.splice(0, 1);
        }
    }

    while (Pool.length > 0) {
        BallList.push(Pool.pop());
    }
}

function restart() {
    loop();
    for (let i = 0; i < WALL_NUM; ++i) {
        const wx = Math.random()*width;
        const wy = Math.random()*height;
        WallList[i].respawn(wx, wy);
    }
}

function mousePressed() {
    stopAndMerge();
    restart();
}
