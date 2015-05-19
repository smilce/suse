define([
    "../core",
    "../object/index",
    "../array/index"
], function(suse, object, array) {

	var _pxPrefix = ["left","top","bottom","right","width","height"];

	var _global = {
		g: function(el){               
	        if(typeof el == "string") return document.getElementById(el);           
	        return el
	    },

	    encodeHTML: function(str){
	        return String(str)
	                .replace(/&/g,'&amp;')
	                .replace(/</g,'&lt;')
	                .replace(/>/g,'&gt;')
	                .replace(/"/g, "&quot;")
	                .replace(/'/g, "&#39;");
	    },

	    show: function(el){
	        el = _global.g(el);
	        el.style.display="";
	    },

	    hide: function(el){
	        el = _global.g(el);
	        el.style.display="none";
	    },

	    addClass: function(dom, name){
	        var names = dom.classList;
	        names.add(name);
	    },

	    removeClass: function(dom, name){
	        var names = dom.classList;
	        names.remove(name);
	    },

	    hasClass: function(dom,classname){
	        dom = _global.g(dom);
	        return dom.className.indexOf(classname) > -1 ? true : false;
	    },

	    toggleClass: function(dom,classname){
	        dom = _global.g(dom);
	        var names = dom.className;
	        (!names) && (names = "");
	        if(_global.hasClass(dom,classname)){
	            var n = names.split(" ");
	            n.pop();
	            dom.className = n.join(" ");
	        }else{
	            dom.setAttribute("className", (dom.getAttribute("className")||"") + " " + classname)
	        }
	    },

	    setStyle: function(dom,atrs){
	        dom = _global.g(dom);
	        var oldStyle = dom.getAttribute("style");
	        var text = "";
	        object.each(atrs,function(key,value){
	            text = array.toString([text,key,":",value, 
	                (array.has(_pxPrefix, key)&&/^-{0,1}\d*\.*\d*$/.test(value)) ? "px;" : ";"]);
	        });
	        dom.style.cssText = oldStyle ? oldStyle + text : text;
	    }
	}

	var _dom = {

	    getCurrentStyle: function(el,key){
	      key = key.replace (/([A-Z])/g, "-$1");
	      key = key.toLowerCase();
	      return document.defaultView.getComputedStyle(el,null)[key];
	    },

	    setHtml: function(dom, c){
	        c.nodeType ? (dom.innerHTML = "", dom.appendChild(c)) : dom.innerHTML = c;
	    },

	    getAbsPos: function(dom){
	        return {
	            left: dom.getBoundingClientRect().left + document.body.scrollLeft,
	            top: dom.getBoundingClientRect().top + document.body.scrollTop
	        }
	    },

	    getStringWidth: function(str, fontSize){
	        var helper = arguments.callee.helper;
	        if(!helper){
	            helper = arguments.callee.helper = document.createElement("span");
	            _global.setStyle(helper, {
	                position: "absolute",
	                left: "-9999px",
	                'font-size': fontSize||'12px'
	            });
	            document.body.appendChild(helper)
	        }
	        helper.innerHTML = _global.encodeHTML(str);
	        return helper.offsetWidth;
	    }
	    
    }

    return _dom;

});