class MyPoint {
    constructor(x = 0, y = 0, type = MyPoint.TYPE.PLAIN) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    static get TYPE() {
        return {
            PLAIN: '0',
            WALL: '1',
            START: 'S',
            DESTINATION: 'E',
            TRACED: 'X'
        }
    }
}

class MyMap {
    constructor(w, h) {
        this.start = null;
        this.end = null;
        
        this.width = w;
        this.height = h;

        this.data = new Array(h);
        for (let i = 0; i < h; ++i) {
            this.data[i] = new Array(w);
        }
    }
}

class ReadFile {
    constructor(filename) {
        this.filename = filename;
    }

    async read() {
        const res = await fetch(this.filename);
        const text = await res.text();
        return text;
    }

    /**
     * @returns {MyMap}
     */
    static async getMap(filename) {        
        const data = await (new ReadFile('map/' + filename)).read();
        const dataArr = data.split(/[\r\n]+/);
        
        const match = dataArr[0].match(/(\d+)\s+?(\d+)/);
        if (!match || !match[1] || !match[2]) {
            console.log(match);
            throw new Error(`${filename} is not a map file`);
        }

        const map = new MyMap(+match[1], +match[2]);
        for (let r = 0; r < map.height; ++r) {
            for (let c = 0; c < map.width; ++c) {
                // r=row, c=column
                const type = dataArr[r + 1].charAt(c);
                map.data[r][c] = new MyPoint(c, r, type);
                if (type === MyPoint.TYPE.START) {
                    map.start = map.data[r][c];
                } else if (type === MyPoint.TYPE.DESTINATION) {
                    map.end = map.data[r][c];
                }
            }
        }

        if (ReadFile._onload) ReadFile._onload(map);
        return map;
    }

    static onLoaded(func) {
        ReadFile._onload = func;
    }

    static async getAllMap() {
        const res = await fetch('map/config.json');
        const json = await res.json();
        return json; 
    }
}