Array.prototype.forEach = Array.prototype.forEach || function(fn){
    for (var i = 0, len = this.length; i < len; i++) {
        fn(this[i], i);
    }
}
Array.prototype.indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] === item)
            return i;
    }
    return -1;
}
Array.prototype.map = Array.prototype.map || function(fn) {
    var arr = [];
    for (var i = 0, len = this.length; i < len; i++) {
        arr.push(fn(this[i], i));
    }
    return arr;
}