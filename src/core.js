define([
	
], function() {

	var _lib = {};

	function suse() {};

	suse.toString = function(){
		return _lib;
	}

	suse.extend = function(keys, value, separator){
	    var len,key;
	    keys = keys.split(separator||'.');
	    len = keys.length-1;
	    for(var i=0;i<len;i++){
	        key = keys[i];
	        if(!obj[key]) obj[key]= {};
	        obj = obj[key];
	    }
	    obj[keys[len]] = value;
	    return obj[keys[len]];
	}


	return suse;
});
