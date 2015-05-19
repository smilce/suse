define([
    "../core"
], function(suse) {

    var dic = [];
    for(var i=0;i<36;i++){ 
        dic[i] = i<10 ? i :  String.fromCharCode(i+87)
    }

    suse.extend('number', {

        // 获取36进制数
        get36: function(num) {
            if(num===0){
                return this.dic[num];
            }
            var result = [];
            while (num >= 1) {
                result.unshift(this.dic[num % 36]);
                num = Math.floor(num / 36)
            }
            return result.join("");
        }

    });

    return suse;

});        