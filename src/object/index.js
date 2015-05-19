define([
    "../core",
    "../array/index"
], function(suse, array) {

    var _object = {

        each: function(obj, iterator, context){
            for(var o in obj){
                iterator.call(context, o, obj[o]);
            }
        },

        has: function(obj, value){
            for(var o in obj){
                if(obj.hasOwnProperty(o)&&obj[o] === value){
                    return true;
                }
            }
            return false;
        },

        extend: function(obj){
            each(Array.prototype.slice.call(arguments, 1),function(source){
                for(var prop in source){
                    obj[prop] = source[prop];
                }
            }); 
            return obj;
        },

        inherit: function (parent, context, protoProps){
            parent = parent || Founder;
            var child = function(){
                context.apply(this, arguments);
                parent.apply(this, arguments);
            }
            var empty = function(){this.constructor = child};
            empty.prototype = parent.prototype;
            child.prototype = new empty;

            if(protoProps) _array.extend(child.prototype, protoProps);

            child.__super__ = parent.prototype;

            return child;
        },

        enableEvents: function(c){
            _array.extend(c, lib.object.Events);
        }


    }

    suse.extend('array', _object);

    return _object;

});

lib.object.Events = {
        //register a fn or some fns to an event, an event can bind some fns
        addListener: function(ev,fn,context){
            //alert(typeof fn);
            //alert(Object.prototype.toString.call(fn));
            //alert(fn instanceof Function);
            this.events = this.events || {};
            this.events[ev] = this.events[ev] || [];
            this.events[ev].push({
                fn: fn,
                context: context||this
            });

            if(this.events[ev].hasExcute){
                this.excuteEv(ev, this.events[ev].hasExcute.args);
            }
        },
        excuteEv: function(ev,args){

            var that = this;
            if(!that.events||!that.events[ev]){
                //throw "no "+ev;
                return;
            }
            if(that.events[ev]){
                for(var i=0,f;f=that.events[ev][i];i++){
                    f.fn.apply(f.context||this,args||[]);
                }
            }

            that.events[ev].hasExcute = {
                args: args
            };
        }
    }
    
    
    
    
    
    lib.object.set = function(obj, key, value, prefix, callback){
        var arr = {};
        if(lib.type.getType(key) === "object"){
            arr = key;
        }else{
            arr[key] = value;
        }
        lib.object.each(arr,function(key,value){
            obj[key] = value;
        });
        callback&&callback(arr);
    }
    lib.object.createAfter = function(){

        return Object.create(lib.object.createAfter.prototype, {
            events: {
                value: [],
                writable: true,
                configurable: true,
                enumerable: true
            }
        });
    }
    lib.object.createAfter.prototype = {
        add: function(event, content){
            this.events.push({
                event: event,
                content: content||arguments.callee.caller
            });
        },
        fire: function(){
            var arg = arguments;
            this.events.forEach(function(data){
                data.event.apply(data.content, arg);
            });
        }
    }