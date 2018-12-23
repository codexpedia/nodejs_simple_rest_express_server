const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

function processReq(req, res) {
	const requestInfo = {
	  	'headers': req.headers,
	  	'url': req.url,
	  	'originalUrl': req.originalUrl,
	  	'method': req.method,
	  	'path': req.path,
	  	'body': req.body
	  }
	  
	console.log(requestInfo)
  res.status(200).send(JSON.stringify(requestInfo, null, 2));
}

// Accept all GET and POST requests
// Accept PUT and DELETE requests on /user
app.get('/*', processReq)
app.post('/*', processReq)
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// Start the server and listen to port 3000
const port = 3000
app.listen(port, () => console.log(`Simple REST service server listening on port ${port}!`))


// curl -H "API_TOKEN: 12345" -H "Content-Type: application/json" -X GET http://localhost:3000/hello/world/?userid=123
// curl -H "Content-Type: application/json" -X GET http://localhost:3000
// curl -X POST http://localhost:3000
// curl -X PUT http://localhost:3000/user
// curl -X DELETE http://localhost:3000/user
// curl -H "Content-Type: application/json" -X POST -d '{"id":"123","name":"james"}' http://localhost:3000/hello/world/
