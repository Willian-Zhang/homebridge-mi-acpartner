
export 
class ACControlUnit {
    constructor(data, possibleValues){
        this.data = data;
        this.possibleValues = possibleValues.keys;
    }
    _min(){
        return Math.min(this.possibleValues);
    }
    _max(){
        return Math.max(this.possibleValues);
    }
    min(){
        this.data = this._min();
        return this;
    }
    max(){
        this.data = this._max();
        return this;
    }
    reverse(){
        this.data = this._max() - this.data;
        return this;
    }
    incr(value){
        this.data += value;
        return this;
    }
    decr(value){
        this.data -= value;
        return this;
    }
}