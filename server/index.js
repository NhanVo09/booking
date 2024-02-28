const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require("./src/routes/users");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING)


app.use("/api/users", userRoutes)

app.listen(3000, () => {
  console.log('Server is running on localhost 3000!');
});
