Asyi
====

A lightweight XMLHttpRequest Framework that designed to simplify the data interaction of web 

Reference : *Cat.chen* Blog



## Features

* Common method such as `GET`,`POST`
* JSONP method 
* Parse XML data to JavaScript Object     `unrealized`
* Easier way to add operation callback method
* Support Cascading

## Method


* GET

```
	var asyi=new Asyi()

	asyi.goto(url).callback(function(data){

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

	asyi.goto('POST',url,form).callback(function(data){
		
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

	// If you want to get a AJAX operation with parameter, you need create a object like this :

	data={

		name : 'Saviio',
		city : 'Shanghai',
		callback : 'cb'  

	} 

	    //or, Asyi also support parameter as string without callback

	data='name=Saviio&city=Shanghai'

	asyi
		.io(url,data)
		.callback(function(data){
			
			// TODO

		})


```
Note: The default JSONP callback method's name of Asyi Framework is ` callback `



* stringify

```
	
	formData={
		
		name : 'Saviio',
		city : 'Shanghai'

	}	

	var asyi=new Asyi()

	asyi.stringify(formData) 

		//return 'name=Saviio&city=Shanghai'



```

* xml

 *TODO*

```



```


## License

Asyi Framework's code uses the MIT license

## At Last

Thanks for using,have fun.


