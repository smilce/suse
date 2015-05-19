define([
    "../core"
], function(suse) {

    suse.extend('type', function(obj){
	        var t = Object.prototype.toString.call(obj);
	        return t.substring(8,t.length -1).toLowerCase(); 
	    }

    });

    return suse;

});