define([
    "../core",
    "../array/index"
], function(suse, arr) {

    var _url = {

        parse: function(urlStr){
            var _a = document.createElement('a'),
                searchObj = ,
                urlObj = {
                    query: {}
                },
                urlQuery = urlObj.query;

            arr.each(['host', 'hostname', 'search', 'protocol', 'port', 'hash', 'pathname', 'href'], function(key){
                urlObj[key] = _a[key];
            });

            if(_a.search.length>1){
                arr.each(_a.search.substr(1).split('&'), function(queryStr){
                    var queryObj = queryStr.split('=');
                    if(queryObj[0]){
                        urlQuery[queryObj[0]]
                    }
                })
            }

            return urlObj;

        }

        format: function(){

        }

        getProtocol: function(value){
            value = value.match(/^(\w+):\/\//);
            return value ? value[1] : "http";
        },

        simplify: function(url){
            return url.replace(/\/$/,"").replace(/(\w+\:\/\/)?(www\.)?/,"");
        },

        isSame = function(a, b){
            return (lib.url.getProtocol(a)===lib.url.getProtocol(b))&&
                    (lib.url.simplify(a) === lib.url.simplify(b));
        }

    }

    suse.extend('url', _url);

    return suse;

});
