/**
* dragupload component
* minoliu(刘炳礼)
  web: http://www.snowmino.com
  twitter: https://twitter.com/545812
  facebook: https://www.facebook.com/mino545812
* from 3-21
**/
;;;;;;  ;;;;;;  ;;  ;; ;;   
    ;;  ;;  ;;  ;;  ;; ;;
    ;;  ;;  ;;  ;;  ;; ;;
;;;;;;  ;;  ;;  ;;  ;;;;;;   
;;      ;;  ;;  ;;     ;;
;;      ;;  ;;  ;;     ;;
;;;;;;  ;;;;;;  ;;     ;;

define(['component/lib/lib'], function(lib){
    var win = window,
        lib = win.lib;

    function child(arg){

        var _default = {
            _uploadNumber: 0,
            _processNumber: 0,
            _successFile: [],
            _failFile: []
        };

        var args = {};
        lib.object.each(arg, function(key, value){
            if(key == "defaults"){
                args._option = value;
                return;
            }
            args["_"+key] = value;
        });

        lib.object.extend(this, _default, args);
        this._init.apply(this, arguments);
        
    }

    var proto = {
        _init: function(){
            var body = win.document.body,
                dropEl = this._dropEl = this._dropEl||body;
            lib.domStopDefault(dropEl, ['dragenter', 'dragleave', 'dragover', 'drop']);
            this._helper = this._dropHandler.bind(this);
            lib.on(dropEl, 'drop', this._helper);
        },
        setDropEl: function(_dropEl){
            lib.un(this._dropEl, 'drop', this._helper);
            this._dropEl = _dropEl;
            lib.domStopDefault(_dropEl, ['dragenter', 'dragleave', 'dragover', 'drop']);
            lib.on(_dropEl, 'drop', this._helper);
        },
        _updateUpload: function(type, file){
            this['_' + type + "File"].push(file);
            this['_' + type]&&this['_' + type](file);
            this._processNumber++;
            if(this._processNumber === this._uploadNumber){
                this._finish&&this._finish({
                    success: this._successFile,
                    fail: this._failFile,
                    total: this._uploadNumber
                });
            }
        },
        _reset: function(fileList){
            this._uploadNumber = fileList.length;
            this._processNumber = 0;
            this._failFile = [];
            this._successFile = [];
        },
        _dropHandler: function(e){

            this.excuteEv('drop');

            var fileList = e.dataTransfer.files;
                //img = document.createElement("img");
            if (fileList.length === 0) return;

            this._reset(fileList);

            var allwFiles = this._allowFile;
            this._uploadFn ? this._uploadFn(fileList) : lib.each(fileList, function(file, index){
                var extname = lib.path.extname(file.name);
                if(allwFiles&&allwFiles.indexOf(extname)<0){
                    /*this._fail&&this._fail({
                        message: "仅支持excel"
                    }, file.name);*/
                    this._updateUpload('fail', {
                        filename: file.name,
                        message: "仅支持excel"
                    });
                }else{
                    var that = this;
                    setTimeout(function(){
                        that._startUpload(file);
                    }, index*100)
                    
                }
                
            }.bind(this));
            /*if (fileList[0].type.indexOf("image") === -1) return;
            if (window.URL.createObjectURL){
                img.src = window.URL.createObjectURL(fileList[0]);
            }   
            else if (window.webkitURL.createObjectURL) img.src = window.webkitURL.createObjectURL(fileList[0]);
            else {
                var reader = new FileReader;
                reader.onload = function(e) {
                    img.src = this.result,
                    oDragWrap.appendChild(img);
                },
                reader.readAsDataURL(fileList[0]);
            }*/

        },
        _startUpload: function(file){
            var xhr = new XMLHttpRequest();
            xhr.open("post", this._url, true);
           /* xhr.upload.addEventListener("progress", function(e){
                $("#dtb-msg3").hide();
                $("#dtb-msg4 span").show();
                $("#dtb-msg4").children('span').eq(1).css({width:'0px'});
                $('.show').html('');
                if(e.lengthComputable){
                    var loaded = Math.ceil((e.loaded / e.total) * 100);
                    $("#dtb-msg4").children('span').eq(1).css({width:(loaded*2)+'px'});
                }
            }, false);*/
            var that = this,
                name = file.name;
            xhr.addEventListener("load", function(e){
                var result = JSON.parse(decodeURIComponent(xhr.responseText));
                var type = !that._isSuccess||that._isSuccess(result) ? 'success' : 'fail';
                that._updateUpload(type, {
                    filename: name,
                    message: result.message
                });
                that = null;
                name = null;
            }, false);
             
            var fd = new FormData();
            fd.append(this._fileName||'file', file);
            if(this._formDatas){
                lib.each(this._formDatas, function(key, value){
                    fd.append(key, value);
                })
            }
            xhr.send(fd);
        }
    }

    lib.object.enableEvents(proto);

    var s = lib.object.inherit(null, child ,proto);

    lib.extend.addComponent("DropUpload",s);

    return lib;

});



