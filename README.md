Asyi
====

A lightweight XMLHttpRequest Framework that designed to simplify the web data interaction  

Reference : *Cat.chen* Blog



## Features

* Standard method for HTTP like `GET`,`POST`
* JSONP method 
* Parse XML data to JavaScript Object     `realized , but maybe need some review`
* Easier way to add callback method
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

The Method above that support add function and config to control error handling and timeout handling

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



* serialize

```
	
	formData={
		
		name : 'Saviio',
		city : 'Shanghai'

	}	

	var asyi=new Asyi()

	asyi.serialize(formData) 

		//return 'name=Saviio&city=Shanghai'



```

* xml


```

	xml_sample = '<?xml version="1.0" encoding="ISO-8859-1"?>'
	            +'<!--Copyright w3school.com.cn -->
	            +'<!-- W3School.com.cn bookstore example -->'
	            +'<bookstore>'
		            +'<book category="children">'
			            +'<title lang="en">Harry Potter</title>'
			            +'<author>J K. Rowling</author>'
			            +'<year>2005</year>'
			            +'<price>29.99</price>'
		            +'</book>'
	            +'</bookstore>'
	         
	
	var asyi=new Asyi()
	
	var data=asyi.xml(xml_sample)
	
	console.log( JSON.stringify(data) )
	
	/* 	{
		    "book": {
		        "category": "children",
		        "title": {
		            "lang": "en",
		            "text": "Harry Potter"
		        },
		        "author": {
		            "text": "J K. Rowling"
		        },
		        "year": {
		            "text": "2005"
		        },
		        "price": {
		            "text": "29.99"
		        }
		    }
		} 
		
	*/

	

```

*Form

```

//testing

```

*Socket

```




```


## License

Asyi Framework's code uses the MIT license

## At Last

Thanks for using , have fun.


