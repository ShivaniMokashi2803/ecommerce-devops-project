const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.listen(3000, () => {
    console.log('Server Running');
});