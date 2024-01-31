require('dotenv').config();

const express = require('express');


// Create an express app
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Register the routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the DNA Collaborator API'});
});

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port', process.env.PORT);
    }
);