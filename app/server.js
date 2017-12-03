const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Webserver parameter
const PORT = 3000;

// Starting our webserver and putting it all together
app.set('port', PORT);
app.listen(app.get('port'));
app.use(bodyParser.json());

//log port
console.log(PORT);


module.exports = app;