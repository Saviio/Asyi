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
		callbackQueue = [],
		errorQueue    = []
		
		
	
	this.result    = undefined
	this.state     = "running"
	this.completed = false
	this.timeOut   = 10000
	this.useJQuery = null
	this.Default   = false


	this.goto=function(type,url,data,dataType){
		

		data = data || null
		args = [].slice.call(arguments)

		if(args.length==1) {

			url  = type;
			type = 'GET'

		}

		if(Object.prototype.toString.call(data)=='[object Object]')data=this.stringify(data)

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

		if(!window.jQuery || (self.Default == false)){

			self.useJQuery = false
			var xhr        = null;

			if( window.XMLHttpRequest ){

				xhr = new XMLHttpRequest()

			}else if(window.ActiveXObject){

				xhr = new ActiveXObject("Microsoft.XMLHTTP")

			}

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

			self.useJQuery = true
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

	this.stringify = function(obj) { 

		var 
			str = '',
			key,
			prop=0


		for (key in obj){

			str+=key+'='+obj[key]+'&'
			prop++

		}

		if(prop===0){

			return ''

		}

		str = str.slice(0,-1)

		return str
	}

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
			callbackMethod = 'Asyi'+timestamp

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

													src.value = url+'?'+self.stringify(data);break;

						case '[object String]' : src.value = url+'?'+data+'&'+cbName+'='+callbackMethod;break;
						default : src.value = url+'?'+cbName+'='+callbackMethod;break;

					}

					this.id   = id.value = "Asyi-"+timestamp

					scriptNode.setAttributeNode(src)
					scriptNode.setAttributeNode(id)				

					this.node=scriptNode
					body.appendChild(scriptNode)
					self.completed=false;

			}

			this.remove=function(method){

				this.node.remove()
				delete window[method]

			}
		}

		segment=new Node(url)
		segment.add()


		window[callbackMethod]=function(data){

			self.yield(data)
			setTimeout(segment.remove(callbackMethod),0)

		}

		return self

	}

}






