Asyi
====

A lightweight XMLHttpRequest Framework that designed to simplify the data interaction of web 

reference:cat.chen blog



## Features

* Common method such as `GET`,`POST`
* JSONP method 
* XML data parse to JavaScript Object     `unrealized`
* Easier way to add operation callback method
* Allow cascade connection

## Method

* GET

```
	var asyi=new Asyi()

	asyi.goto(url).callback(function(){

		// TODO

	})
```

* POST

```
	var form={

		name : 'Saviio',
		city : 'Shanghai'

	}	

	var asyi=new Asyi()

	asyi.goto('POST',url,form).callback(function(){
		
		//TODO

	})

```

The Method aboved that support add function and config to control error handling and timeout handling

```
	asyi.timeOut = 10000

	asyi.goto(url)
				.callback(function(data){

					// TODO

				})
				.error(function(){

					// TODO

				})

```


* JSONP 

```
	
	var asyi=new Asyi()

	asyi
		.io(url)
		.callback(function(data){

			// TODO

		})

	// If you get a AJAX operation with parameter

	data={

		name : 'Saviio',
		city : 'Shanghai',
		callback : 'cb'  // The default JSONP callback method's name of Asyi Framework is `callback`

	} 

	or

	data='name=Saviio&city=Shanghai'

	asyi
		.io(url,data)
		.callback(function(data){
			
			// TODO

		})


```	


## License

Asyi Framework's code uses the MIT license

## At Last

Thanks for using,have fun.


