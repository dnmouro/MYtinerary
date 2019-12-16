const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
app.use('/cities', require('./routes/cities'))

const connectDB = async(rec, res) => {
    try {
        await mongoose.connect('mongodb+srv://dnmouro:Leonor01@mytinerarydnmouro-hozxr.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("dbconnected");

    } catch (err) {
        console.log(err.message);
               
    }
}
connectDB();

