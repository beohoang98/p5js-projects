class AStar {
    constructor(weight = 1) {
        /**
         * @type {MyMap}
         */
        this.map = null;
        this.weight = weight;
        this.count = 0;

        this.listOfPath = new TinyQueue([], (a, b) => {
            return a.total - b.total;
        });
        
        this._funcFounded = (path)=>{};
    }

    addMap(map) {
        this.map = Object.assign({}, map);
        const firstPath = new Path(this.map.start, this.map.end);
        firstPath.total = 0;
        this.map.start.type = MyPoint.TYPE.PLAIN;
        this.listOfPath.push(firstPath);
    }

    onFound(func) {
        this._funcFounded = func;
    }

    continueChoose(drawFunc, openSetFunc) {
        if (this.isHaveOpenPath()) {
            const path = this.getBestPath();
            if (!path) return;

            const point = path.point;
            if (point.type === MyPoint.TYPE.TRACED) return;
            point.type = MyPoint.TYPE.TRACED; // trace it
            drawFunc(point);

            const openSet = []; // just for hook, no value here

            for (const [dx, dy] of [[1,0], [-1, 0], [0, 1], [0, -1]]) {
                const newX = point.x + dx;
                const newY = point.y + dy;
                if (newX < 0 || newX >= this.map.width || newY < 0 || newY >= this.map.height)
                    continue;
                
                if (this.map.data[newY][newX].type === MyPoint.TYPE.DESTINATION) {
                    this._funcFounded(path);
                }

                if (this.map.data[newY][newX].type !== MyPoint.TYPE.PLAIN) {
                    continue;
                }

                ++this.count;
                openSet.push(this.map.data[newY][newX]);
                this.openPath(path, this.map.data[newY][newX]);
            }

            openSetFunc(openSet);
        }
    }

    getBestPath() {
        return this.listOfPath.pop();
    }

    openPath(from, point) {
        const dN = from.trace.length;
        const N = this.listOfPath.length;
        let w = this.weight*(dN < N ? 1 - dN/N : 0);

        const newPath = from.createNew(point, w);
        this.listOfPath.push(newPath);
    }

    isHaveOpenPath() {
        return this.listOfPath.length > 0;
    }
}

function Path (point, destination) {
    this.point = point;
    this.destination = destination;
    
    this.heuristic = sqrt((point.x - destination.x)**2 + (point.y - destination.y)**2);
    this.total = 0;
    this.trace = [point];

    this.equal = (other) =>{
        return (this.point == other.point && this.destination == other.destination);
    }

    this.createNew = (point, ew = 0) => {
        const _new = new Path(point, this.destination);
        _new.total = this.total + (1 + ew)*_new.heuristic;
        _new.trace = this.trace.slice();
        _new.trace.push(point);

        return _new;
    }
}