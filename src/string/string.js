define([
    "../core"
], function(suse) {

    suse.extend('string', {

        getRandomCN: function(start, end){
            var num = Math.round(Math.random()*(end - start)) + start,
                result="";
            while(num){
                result += "%u" + (Math.round(Math.random()*20923) + 19968).toString(16);
                num --;
            }
            return unescape(result);
        },

        getRandomWord = function(start, end){
            var num = Math.round(Math.random()*(end - start)) + start,
                result="";
            while(num){
                result += String.fromCharCode(Math.round(Math.random()*25) + 97);
                num --;
            }
            return result;
        },

        toHeadUpperCase  = function(str){
            return str.substring(0,1).toUpperCase()+str.substring(1).toLowerCase();
        },



    });

    return suse;

});
    