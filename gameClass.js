class gameclass {
    constructor(){
    this._score = 0;
    this._clickerCost = 15;
    this._clickers = 0;
    this._multiplierCost = 10;
    this._multipliers = 1;
    this._clickPower = 1;
    this._multiplyCalc = 0;
    }
    get score(){
        return this._score;
    }
    get clickerCost(){
        return this._clickerCost;
    }
    get clickers(){
        return this._clickers;
    }get multiplierCost(){
        return this._multiplierCost;
    }
    get multipliers(){
        return this._multipliers;
    }
    get clickPower(){
        return this._clickPower;
    }
    get multiplyCalc(){
        return this._multiplyCalc;
    }

    addToScore(){
        this._score = this._score + this._clickPower;
        this.getValues();

    }

    buyClicker(){
        if(this._score>=this._clickerCost){
            this._score = this._score - this._clickerCost;
            this._clickers = this._clickers +1;
            this._clickerCost = Math.round(Math.pow(this._clickerCost*1.10, 1.2));
            this.getValues()
        }
    }
    buyMultiplier(){
        if(this._score>=this._multiplierCost){
            this._score = this._score - this._multiplierCost;
            this._multipliers = this._multipliers + 1;
            this._multiplyCalc = Math.pow(1.2,this._multipliers)
            this._clickPower = this._clickPower * this._multiplyCalc;
            this._multiplierCost = Math.round(Math.pow(this._multiplierCost*1.10, 1.2))
            this.getValues()
    
        }
    }

    getValues(){
            document.querySelector("#score").innerHTML = this._score;
            document.querySelector("#multiplyCost").innerHTML = this._multiplierCost;
            document.querySelector("#multiple").innerHTML = this._multipliers;
            document.querySelector("#cost").innerHTML = this._clickerCost;
            document.querySelector("#clickers").innerHTML = this._clickers;
    }


}
export default gameclass;