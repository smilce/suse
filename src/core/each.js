define([
    "../core",
    "./judge"
    "../array/index",
    "../object/index",
], function(suse, judge, array, object) {

    var canEach = {
        'array': array,
        'object': object
    }
    
    suse.extend('each', function(obj, iterator, context){
        var type = judge.getType(obj),
            eachType = canEach[type];
        if(!eachType){
            if(obj.length!==undefined){
                obj = array.toArray(obj);
                type = 'array';
            }else{
                throw "the first arguments can't be eached , please change it"
            }
        }
        eachType.each(obj, iterator, context);
    })
    

    return suse;

});