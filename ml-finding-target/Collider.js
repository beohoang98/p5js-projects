
// shape of collider are all cirlce
class Collider {

    /**
     * @type Collider[]
     */
    static get listCollider() {
        if (!Collider._listCollider) {
            Collider._listCollider = {};
        }
        return Collider._listCollider;
    }

    constructor(tag = "") {
        this.tag = tag;
        this.uuid = uuidv4();
        this.funcOnCollider = ()=>{};
        Collider.listCollider[this.uuid] = this;
    }

    destroy() {
        Collider.remove(this.uuid);
    }

    /**
     * event call when collision are triggered
     * @param {(Collider)=>{}} callback 
     */
    onCollider(callback) {
        this.funcOnCollider = callback;
    }

    /**
     * check if 2 collider are collision or not
     * @param {Collider} anotherCollider 
     */
    check(anotherCollider) {
        
    }

    static checkAll() {
        const arrKey = Object.keys(Collider.listCollider);
        const len = arrKey.length;

        for (let i = 0; i < len - 1; ++i) {
            for (let j = i + 1; j < len; ++j) {
                if (Collider.listCollider[arrKey[i]].check(Collider.listCollider[arrKey[j]]) > 0) {
                    Collider.listCollider[arrKey[i]].funcOnCollider(Collider.listCollider[arrKey[j]]);
                    Collider.listCollider[arrKey[j]].funcOnCollider(Collider.listCollider[arrKey[i]]);
                }
            }
        }
    }

    static remove(uuid) {
        delete Collider._listCollider[uuid];
    }
}

class CircleCollider extends Collider {
    constructor(x, y, radius, tag) {
        super(tag);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    /**
     * @override
     * @param {Collider} anotherCollider
     * @return true/false if collision or not
     */ 
    check(anotherCollider) {
        if (anotherCollider instanceof CircleCollider) {
            return this.checkWithCircleCollision(anotherCollider);
        } else if (anotherCollider instanceof LineCollider) {
            return this.checkWithLineCollider(anotherCollider);
        }

        return false;
    }

    checkWithCircleCollision(collider) {
        const distance2 = (this.x - collider.x) ** 2
                        + (this.y - collider.y) ** 2;
        const minDistance2 = (this.radius + collider.radius) ** 2;
        
        return (distance2 <= minDistance2);
    }

    checkWithLineCollider(collider) {
        return false;
    }

    update(x,  y) {
        this.x = x;
        this.y = y;
    }
}

class LineCollider extends Collider {
    constructor(x1, y1, x2, y2, tag) {
        super(tag);

        this.x1 = x1; this.y1 = y1;
        this.x2 = x2; this.y2 = y2;
    }

    update(x,  y) {
        this.x = x;
        this.y = y;
    }
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}