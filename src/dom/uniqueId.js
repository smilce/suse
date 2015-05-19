define([
    "../core",
    "./index"
], function(suse, dom) {

    suse.extend('uniqueId', function(prefix) {
        var id = path++;
        return prefix ? prefix + id : id;
    });

    suse.extend('noConflictId', function(prefix){
        var id = (prefix||"noConflict") + new Date().getTime();
        if(dom.g(id))
            return suse.noConflictId(prefix);
        return id;
    });

    return suse;

});