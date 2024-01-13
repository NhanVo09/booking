const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING)


app.get('/api/test', async (req, res) => {
  res.json('Hello from express endpoint!');
});

app.listen(3000, () => {
  console.log('Server is running on localhost 3000!');
});
