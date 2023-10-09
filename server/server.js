// Require express - gives us a function
const express = require('express');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 5001;
// app.use(bodyParser.json()); 

// express static file serving - public is the folder name
app.use(express.static('server/public'));
app.use(express.json());

// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});


// setting up routes

const equationsArray = [];

app.get('/equations', (req, res) =>{
    res.send(equationsArray);
});

app.post('/equations', (req, res) => {
    console.log('New equation', req.body);
    // equation(req.body);
let result = equation(req.body);
    equationsArray.push(result);
    console.log(result);

    res.sendStatus(200);
});

