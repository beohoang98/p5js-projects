const WIDTH = 800;
const HEIGHT = 600;
const BLOCK_SIZE = 20;
const SPEED = 20;
const MAP_DEFAULT = 'test1.map';

/**
 * @type {MyMap}
 */
let map = null;
let weight = 1;

/**
 * @type {AStar}
 */
let aStar = null;
let isStarted = false;
let isFound = false;

async function setup() {
    createCanvas(WIDTH, HEIGHT);
    background(255);
    frameRate(SPEED);
    noLoop();
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const selectMap = document.getElementById('map-select');
    const weightInput = document.getElementById('weight'); 
    selectMap.onchange = ev=>{
        const mapName = selectMap.value;
        ReadFile.getMap(mapName);
    }

    const maps = await ReadFile.getAllMap();
    for (const mapName of maps) {
        selectMap.innerHTML += `<option value='${mapName}'>${mapName}</option>`;
    }
    startButton.onclick = () => {
        if (isFound) {
            ReadFile.getMap(selectMap.value);
            return;
        }
        loop();
    }
    pauseButton.onclick = ()=>{
        noLoop();
    }
    weightInput.onchange = (ev)=>{
        weight = weightInput.value;
        ReadFile.getMap(selectMap.value);
    }

    ReadFile.getMap(MAP_DEFAULT);
    ReadFile.onLoaded(_map=>{
        map = _map;
        resizeCanvas((map.width + 2) * BLOCK_SIZE, (map.height + 2)*BLOCK_SIZE);
        noLoop();
        drawMap();
        isFound = false;
        startButton.textContent = 'START';

        aStar = new AStar(weight);
        aStar.addMap(map);
        aStar.onFound((path) => {
            drawFoundPath(path);
            isFound = true;
            startButton.textContent = 'RESTART';

            console.log(path);
            alert(`${aStar.count} opened node`);
            noLoop();
        });

        document.getElementById('control').style.display = 'block';
    });
}

function draw() {
    if (!aStar) return;
    aStar.continueChoose((point) => {
        noStroke();
        alpha(128);
        fill(color('#c50'));
        drawPoint(point.x, point.y);
        // console.log(point);
    }, (openSet) => {
        noStroke();
        alpha(128);
        fill(color('#cc0'));
        for (const point of openSet) {
            drawPoint(point.x, point.y);
        }
    });
}

function drawMap() {
    push();
    noStroke();
    background(255);

    fill(0);
    for (const row of map.data) {
        for (const point of row) {
            if (point.type === MyPoint.TYPE.PLAIN) {
                continue;
            } 
            if (point.type === MyPoint.TYPE.WALL) {
                fill(color('#555'));
            } else if (point.type === MyPoint.TYPE.DESTINATION) {
                fill(color('#3f3'));
            } else {
                fill(color('#33f'));
            }

            drawBlock(point.x+1, point.y+1);
        }
    }

    fill(128);
    for (let r = 1; r <= map.height; ++r) {
        drawBlock(0, r);
        drawBlock(map.width+1, r);
    }
    for (let c = 0; c <= map.width + 1; ++c) {
        drawBlock(c, 0);
        drawBlock(c, map.height+1);
    }

    pop();
}

function drawFoundPath(path) {
    push();
    noStroke();
    fill(color('cyan'));

    for (const point of path.trace) {
        drawPoint(point.x, point.y);
    }

    pop();
}

function drawPoint(_x, _y) {
    const x = (_x + 1) * BLOCK_SIZE + BLOCK_SIZE/2;
    const y = (_y + 1) * BLOCK_SIZE + BLOCK_SIZE/2;
    ellipse(x, y, BLOCK_SIZE*2/3);
}

function drawBlock(x, y) {
    rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE-1, BLOCK_SIZE-1, 4);
}