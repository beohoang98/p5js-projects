class ADN {
    static get SIZE () {return 100};
    static get DEFAULT_MIN_VALUE() {return -1000}
    static get DEFAULT_MAX_VALUE() {return 1000}
    static DEFAULT_MUTATION_RATIO_SIZE() {return 100}

    /**
     * 
     * @param {number} size 
     */
    constructor(size = SIZE, minValue = DEFAULT_MIN_VALUE, maxValue = DEFAULT_MAX_VALUE) {
        this.size = size;
        this.elements = [];
    
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    randomize() {
        for (let i = 0; i < this.size; ++i) {
            this.elements[i] = Math.random()*(this.maxValue - this.minValue) + this.minValue;
        }
    }

    /**
     * merge 2 adn
     * @param {ADN} adn1 
     * @param {ADN} adn2
     * @return {ADN} adn merged of the bigger size 
     */
    static merge(adn1, adn2) {
        const maxSize = Math.max(adn1.size, adn2.size);
        const adnMerged = new ADN(maxSize, adn1.minValue, adn1.maxValue);
        adnMerged.elements = Object.assign([], adn1.elements);

        for (let i = 0; i < maxSize; ++i)
        {
            if (i >= adn1.size) {
                adnMerged.elements[i] = adn2.elements[i];
            } else {
                adnMerged.elements[i] = (Math.floor(Math.random() * 2))
                                        ? adn1.elements[i]
                                        : adn2.elements[i];
            }
        }

        adnMerged.mutation();
        return adnMerged;
    }

    /**
     * divide in 100000
     * @param {number} ratio 
     */
    mutation(ratioSize = ADN.DEFAULT_MUTATION_RATIO_SIZE) {
        for (let i = 0; i < this.size; ++i) 
        {
            if (Math.floor(Math.random() * ratioSize) == 0) {
                console.log("mutation");
                this.elements[i] = Math.random()*(this.maxValue - this.minValue) + this.minValue;
            }
        }
    }
}