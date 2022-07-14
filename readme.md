routing.json format:
	"views": {
		endpoints that perform no logic other 
		than rendering a pug template
		"endpoint": "template"  
	}
	"handlers": {
		endpoints that need to be bound to specific
		handler modules 
		"enpoint": "module" 
	}
	"parameters": {
		specification of the variables each endpoint 
		expects to recieve 
		"endpoint": [ "expected", "values" ]
	}