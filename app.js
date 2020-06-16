const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'post created', 
                authData
            });
        }
    });
    
});

app.post('/api/login', (req, res) => {
    // mock user
    const user = {
        id: 1,
        username: 'amp',
        email: 'amp@gmail.com'
    }

    jwt.sign({user: user}, 'secretkey', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token
        })
    });
});

//verify token
function verifyToken(req, res, next) {
    const hdr = req.headers['authorization'];

    //check if undefined
    if (typeof hdr !== 'undefined') {
        //split at the space
        req.token = hdr.split(' ')[1];
        next();
    } else {
        // forbidden
        res.sendStatus(403);
    }
}

app.listen(5000, ()=> console.log('server started on p5000'));