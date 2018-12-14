
// shape of collider are all cirlce
class Collider {

    /**
     * @type Collider[]
     */
    static get listCollider() {
        if (!Collider._listCollider) {
            Collider._listCollider = [];
        }
        return Collider._listCollider;
    }

    constructor() {
        this.funcOnCollider = ()=>{};
        Collider.listCollider.push(this);
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
        for (let i = 0; i < Collider.listCollider.length - 1; ++i) {
            for (let j = i + 1; j < Collider.listCollider.length; ++j) {
                if (Collider.listCollider[i].check(Collider.listCollider[j])) {
                    Collider.listCollider[i].funcOnCollider(Collider.listCollider[j]);
                    Collider.listCollider[j].funcOnCollider(Collider.listCollider[i]);
                }
            }
        }
    }
}

class CircleCollider extends Collider {
    constructor(x, y, radius, tag) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.tag = tag;
    }

    /**
     * @override
     * @param {Collider} anotherCollider
     * @returns `0` if be not collision
     * @returns `number` length of abstract radius if collision
     */ 
    check(anotherCollider) {
        const distance2 = (this.x - anotherCollider.x) * (this.x - anotherCollider.x)
                        + (this.y - anotherCollider.y) * (this.y - anotherCollider.y);
        const minDistance2 = (this.radius + anotherCollider.radius)
                            * (this.radius + anotherCollider.radius);
        
        if (distance2 <= minDistance2)
            return minDistance2 - distance2;
        return 0;
    }

    update(x,  y) {
        this.x = x;
        this.y = y;
    }
}