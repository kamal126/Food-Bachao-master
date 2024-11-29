const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS ko import karein
const app = express();
const port = 5000;

app.use(cors()); // CORS middleware ko use karna
app.use(express.json()); // JSON data handle karne ke liye

const mongoURI = 'mongodb://localhost:27017/foodbacho';

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB 🎉");
    })
    .catch((err) => {
        console.error("MongoDB se connection mein error aaya:", err);
    });



    
const foodSchema = new mongoose.Schema({
    foodName: String,
    quantity: Number,
    location: String,
    expiry: Number,
    notes: String
});

const Food = mongoose.model('Food', foodSchema);

// Data add karne ka endpoint
app.post('/api/food', async (req, res) => {
    try {
        const food = new Food(req.body);
        const result = await food.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send("Data insert karne mein error aayi:", error);
    }
});

// Saare food items fetch karne ka endpoint
app.get('/api/food', async (req, res) => {
    try {
        const foodItems = await Food.find();
        res.status(200).send(foodItems);
    } catch (error) {
        res.status(500).send("Data fetch karne mein error aayi:", error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
