define([
    "../core"
], function(suse) {

	var _array = {
		push: Array.prototype.push,
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    indexOf: Array.prototype.indexOf,
	    each: function(obj, iterator, context){
	    	obj.forEach(iterator, context);
	    },
	    has: function(obj, value){
	        return obj.indexOf(value) > -1 ? true : false;
	    }
	    toString: function(arg, sep){
	        return arg.join(sep||"");
	    },
	    split: function(arr, number){
	        var 
	            list = [],
	            l;

	        while((l = arr.splice(0,number)).length>0){
	            list.push(l);
	        }

	        return list;
	    };
	    loop: function(num, fn){
	        var i = 0;
	        for(;i++<num;){
	            fn(i);
	        }
	    },
	    /* 判断两个数组是否完全相同，即长度相同，每一项也都相同
	    * @left 
	    * @right
	    */
	    isSame: function(left, right){
	        if(!left||!right){
	            throw "you must provide two array."
	        }
	        var len,l,r,c,index;
	        if((l = left.length)!==right.length){
	            return false;
	        }
	        l = left.slice(0), r = right.slice(0), c = l.shift();
	        while(c){
	            if((index = r.indexOf(c)) < 0){ 
	                return false;
	            }else{
	                r.splice(index, 1);
	                c=l.shift();
	            }
	        }
	        if(l.length===0&&r.length===0){
	            return true;
	        }
	        return false;
	    },
	    toArray: function(array){
	        return  Array.prototype.slice.apply(array, []);
	    }
	    zip: function(){
	        var result = [],
	            len = Number.MAX_VALUE,
	            arrs = _array.toArray(arguments),
	            arrNum = arrs.length;
	        _array.each(arrs, function(index, item){
	            if(item.length < len) len = item.length;
	        });
	        _array.iterator(len, function(i){
	            var arr = [];
	            _array.iterator(arrNum, function(j){
	                arr.push(arrs[j][i]);
	            });
	            result.push(arr);
	        })
	        return result;
	    }
	}

	_array.iterator = _array.loop;
	_array.o2t = _array.split;

    suse.extend('array', _array);

    return _array;

});