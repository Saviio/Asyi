/*
 *
 *
 * @method goto
 * @param  type 指定传递消息方法 optional && GET || POST , By default the param is GET
 * @param  url  目标URL
 * @param  data 当方法为POST时，传递的数据
 * @param  dataType期待返回的结果类型
 * @return {AJAX||this} 支持级联
 * 
 * 
 */


var Asyi=function () {

	var 
		 pointer = this
		, win    = this || (0, eval)('this')

	var AJAX=function(){

		var 
			callbackQueue = [],
			errorQueue    = []
			
			
		
		this.result    = undefined
		this.state     = "running"
		this.completed = false
		this.timeOut   = 10000
		this.usejQuery = null
		this.Default   = false


		this.goto=function(type,url,data,dataType){
			

			data = data || null
			args = [].slice.call(arguments)

			if(args.length==1) {

				url  = type;
				type = 'GET'

			}

			if(Object.prototype.toString.call(data)=='[object Object]')data = pointer.serialize(data)

			var 
			    self     = this,
			    _timeOut = null

			self.completed=false;

			function abortTimeOut(xhr,time) {

				if ( xhr.timeout ){

					xhr.timeout = time

				} else {

					_timeOut = setTimeout(function() {

						xhr.abort()

					},time)
				}

			}

			function createXHR(){

				var _xhr

				if( window.XMLHttpRequest ){
					_xhr = new XMLHttpRequest()

				}else if(window.ActiveXObject){
					_xhr = new ActiveXObject("Microsoft.XMLHTTP")

				} else {
					_xhr = null
					throw "Your browser do not support AJAX"

				}	
				return _xhr		

			}

			if(!window.jQuery || (self.Default == false)){

				self.usejQuery = false
				var xhr        = null;

				xhr=createXHR()

				xhr.open(type,url,true)
				abortTimeOut(xhr,this.timeOut)

				xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
				xhr.onreadystatechange = function() {

					if (xhr.readyState == 4 && xhr.status == 200 ){	

						if(_timeOut !== null) clearTimeout(_timeOut);
						self.yield(xhr.responseText);

					} else {

						self.extra()

					}

				}

				xhr.send(data)

			} else { // Asyi的jQuery Ajax引用还待测试，可能存在不期待的异常

				$.ajaxSetup({ cache: false }); 

				self.usejQuery = true
				data           = data || null
				dataType       = dataType || 'jsonp' 

				$.ajax({ 

				  url: url,
				  data: data,
				  success: function(result) {  

					self.yield(result); 

				  },
				  dataType: dataType

				});

			}

			return self;
		}



	    this.yield = function(result) { 

	        var self = this;

	        setTimeout(function() {

	            self.result    = result;
	            self.state     = "completed";
	            self.completed = true;

	            while (callbackQueue.length > 0) {

	                var callback = callbackQueue.shift();
	                callback(self.result);

	            }

	        }, 1);

	        return this;
	    };

		this.callback = function(callback) { 

			callbackQueue.push(callback);

			if (this.completed) {

				this.yield(this.result);

			}

			return this;
		};


		this.error=function(callback){

			errorQueue.push(callback);
			return this;

		}

		this.extra=function(){

			var self = this;

		    setTimeout(function() {

	            self.result    = null;
	            self.state     = "error";
	            self.completed = false;

	            while (errorQueue.length > 0) {

	                var callback = errorQueue.shift();
	                callback();

	            }
	        }, 1); 

	        return this

		}

		this.io=function(url,data){ //JSON with Padding method 

			var cbName='callback';

			var 
				self           = this,
				timestamp      = new Date().getTime(),
				rand           = Math.random().toString().substr(2);
				callbackMethod = 'Asyi'+timestamp+'_'+rand

			var Node=function(url){

				this.add=function(){

					var 
						body       = document.getElementsByTagName('body')[0],
						scriptNode = document.createElement("script"),
						src        = document.createAttribute("src"),
						id         = document.createAttribute("id")

						switch(Object.prototype.toString.call(data)){

							case '[object Object]' : 
														if(data["callback"] !== undefined ){

															var _name   = data["callback"]
															data[_name] = callbackMethod

															delete data["callback"]

														} else {

															data[cbName] = callbackMethod

														}

														src.value = url+'?'+pointer.serialize(data);break;

							case '[object String]' : src.value = url+'?'+data+'&'+cbName+'='+callbackMethod;break;
							default : src.value = url+'?'+cbName+'='+callbackMethod;break;

						}

						this.id   = id.value = "Asyi-"+timestamp

						scriptNode.setAttributeNode(src)
						scriptNode.setAttributeNode(id)				

						this.node=scriptNode
						body.appendChild(scriptNode)
						self.completed=false;

						this.registerHandle(callbackMethod)

				}

				this.remove=function(method){

					this.node.remove()
					delete window[method]

				}

				this.registerHandle=function(cbm){

					window[cbm]=function(data){

						self.yield(data)
						setTimeout(function(){

							segment.remove(cbm)

						},0)

					}
				}
			}

			var segment = new Node(url)
			
			segment.add()




			return self

		}

	}

	this.io=function(url,data){

		var 
			ajax  = new AJAX(),
			args  = [].slice.call(arguments)
		
		return ajax.io.apply(ajax,args)
	}

	this.goto=function(type,url,data,dataType){

		var 
			ajax  = new AJAX(),
			args  = [].slice.call(arguments)

		return ajax.goto.apply(ajax,args)
	}

	this.serialize = function(obj,parent){

			var 
				query  = []
				parent = parent || ''
			
            
            for(var i in obj){
            	sub=''
            	if(obj.hasOwnProperty(i)){
            		var sub = ( parent =='' ? i : parent+'.'+i )
            		if(Object.prototype.toString.call(obj[i])=='[object Object]'){
            			query.push(pointer.serialize(obj[i],sub))
            		} else {
            			query.push(encodeURIComponent(sub)+'='+encodeURIComponent(obj[i]))
            		}
            	}
            }
            
            return query.join('&')
    }
	
	this.xml = function(xml) {
		
		function loadXML(xmlDocument){ 

			var xmlDoc=null;
			if (window.ActiveXObject) {
				xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = false;
				xmlDoc.load(xmlDocument);
			} else if (DOMParser) {

				xmlDoc = new DOMParser().parseFromString(xmlDocument, "text/xml");

			} else {
				throw "Your Browser does not support xml parse"
				return null;
			}
			
			return xmlDoc;
		}
			
		var 
		xmlDoc=loadXML(xml),
		root=xmlDoc.documentElement,
		childNodeList=root.childNodes;
		
		function createObj(arr,origin){
		
			var obj=origin||{}
		
			for(var i=0;i<arr.length;i++){
		
				var thisNode=arr[i]
				if(thisNode.nodeName!=='#text'){
		
					if(obj[thisNode.nodeName]!==undefined){
						if(Object.prototype.toString.call(obj[thisNode.nodeName])!=='[object Array]'){
		
							var _preNode=obj[thisNode.nodeName]
							obj[thisNode.nodeName]=[]
							obj[thisNode.nodeName].push(_preNode)
						}
					} else {
						obj[thisNode.nodeName]=null
					}			
				}
		
				var 
					attrList = thisNode.attributes,
					attr     = null
		
				if(attrList!==undefined){
					
					attr={}
					for (var k =0;k<attrList.length;k++){
						attr[attrList[k].localName]=thisNode.getAttribute(attrList[k].localName)
					}
				}					
		
				var hasChild=null
				thisNode.childNodes.length ? hasChild=true : hasChild=false
		
				if(hasChild){
		
					if(Object.prototype.toString.call(obj[thisNode.nodeName])!=='[object Array]'){
						obj[thisNode.nodeName]=createObj(thisNode.childNodes,attr)
					} else {
						obj[thisNode.nodeName].push(createObj(thisNode.childNodes,attr))
					}			
				} else {
		
					if(thisNode.textContent!==""){
						obj["text"]=thisNode.textContent
					}
				}
			}
		
			return obj
		}
			
		var xmlObj=createObj(childNodeList)
		return xmlObj
	}
}

asyi=new Asyi()

