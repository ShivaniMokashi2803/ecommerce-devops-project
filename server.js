const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose.connect(
'mongodb+srv://shivani:admin123@cluster0.g6b1sjs.mongodb.net/ecommerceDB?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// static files
app.use('/static', express.static('public'));

// login page first
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// shopping page
app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// User schema
const User = mongoose.model('User', {
    username: String,
    password: String
});

// Create default user
async function createDefaultUser(){
    const existingUser = await User.findOne({ username: 'admin' });

    if(!existingUser){
        await User.create({
            username: 'admin',
            password: '123'
        });
        console.log("Default user created");
    }
}

createDefaultUser();

// Login API using MongoDB
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({
        username: username,
        password: password
    });

    if(user){
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Product API
app.get('/products', (req, res) => {
    res.json([
        { id:1, name:'Laptop', price:50000, category:'Electronics' },
        { id:2, name:'Phone', price:25000, category:'Electronics' },
        { id:3, name:'Shoes', price:2500, category:'Footwear' },
        { id:4, name:'Watch', price:4000, category:'Accessories' },
        { id:5, name:'Denim Jacket', price:1999, category:'Fashion' },
        { id:6, name:'Makeup Kit', price:899, category:'Beauty' }
    ]);
});

// Cart API
let cart = [];

app.post('/cart', (req, res) => {
    cart.push(req.body);
    res.json({ message: 'Product added to cart', cart });
});

app.get('/cart', (req, res) => {
    res.json(cart);
});

app.delete('/cart/:index', (req, res) => {
    cart.splice(req.params.index, 1);
    res.json({ message: 'Product removed', cart });
});

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});