define([
    "../core"
], function(suse) {

	function Super(arg){
        this.author = "minoliu";
        this.version = "0.0.0.0";
        this.web = (arg&&arg.web)||"http://www.snowmino.com";

    }
    Super.prototype = {
        constructor: Super
    }

	suse.extend('super', Super)

    return Super;

});