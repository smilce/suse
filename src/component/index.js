define([
    "../core"
], function(suse) {

	var _components = {};

    suse.extend('addComponent', function(name, fn){
        _components[name] = fn;
    });

    suse.extend('useComponent', function(name, args){
        return new _components[name](args);
    })

    return suse;

});