define([
    "../core"
], function(suse) {

    suse.extend('path', {

    	extname: function(path){
	        var pos=path.lastIndexOf(".");
	        return pos > -1 ? path.substring(pos+1) : '';
	    }

    });

    return suse;

});