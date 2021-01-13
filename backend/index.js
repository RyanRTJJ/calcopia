const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const foodInfoRouter = require('./routes/foodinfo');
const usersRouter = require('./routes/users');

// The following strings are collection names as per MongoDB
app.use('/foodinfo', foodInfoRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send("Hello from APIs");
});

app.listen(port, () => {
    console.log(`Server is runing on port : ${port}`);
})