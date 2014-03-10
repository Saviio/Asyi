var 
    
    upload=function(){
    
    
            this.dragUpload=function(node,config){
      
        
        		function handleFile(evt) {
        			evt.stopPropagation();
        			evt.preventDefault();
        
        			var files = evt.dataTransfer.files;
        
        			for (var i = 0, f; f = files[i]; i++) {
        
        				var 
        					t      = f.type ? f.type : 'n/a',
        					reader = new FileReader(),
        					looks  = function (f, img) {
        						node.innerHTML = img;
        					},
        					isImg  = isImage(t),
        					img    = undefined;
        
        				if (isImg) {
        					reader.onload = (function (theFile) {
        						return function (e) {
        							img = '<img class="preview" src="' + e.target.result + '" title="' + theFile.name + '"/>';
        							looks(theFile, img);
        						};
        					})(f)
        					reader.readAsDataURL(f);
        				} else {
        					var err_msg = '"Sorry Asyi.Upload only support picture for now';
        					looks(f, err_msg);
        				}
        
        			}
        
        		}
        
        		function handleDragEnter(evt){ this.setAttribute('style', 'border-style:dashed;'); }
        		function handleDragLeave(evt){ this.setAttribute('style', ''); }
        		function handleDragOver(evt) { evt.stopPropagation();evt.preventDefault();}
        
        
        
        		function isImage(file){
        			var state = file && file==='image/jpeg' || file==='image/png' || file==='image/gif' || file==='image/bmp' || file==='image/jpg' || false
        			return state
        		}
        
        		this.util.addListener(node,'dragenter',handleDragEnter,false)
        		this.util.addListener(node,'dragover',handleDragOver,false)
        		this.util.addListener(node,'drop',handleFile,false)
        		this.util.addListener(node,'dragleave',handleDragLeave,false)
        	}
        
        	this.util={
        		addListener:function(elm, evType, fn, useCapture){
        
        		    useCapture=useCapture||false;
        			if (elm.addEventListener) {
        			   elm.addEventListener(evType, fn, useCapture);
        			   return true;
        			}
        			else if (elm.attachEvent) {
        			   var r = elm.attachEvent('on' + evType, fn);
        			   return r;
        			}
        			else {
        			   elm['on' + evType] = fn;
        			}   	
        		},
        		type:function(){
        			var str = Object.prototype.toString.call(obj);
            		return str.replace(/^\[object (\w+)\]$/, '$1');
        		}
        	}
    }
