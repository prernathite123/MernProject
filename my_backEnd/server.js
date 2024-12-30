const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors =require("cors");
app.use(cors());
dotenv.config();

const userRoute =require("./routes/userRoute");

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.URI)
.then(() => {
    console.log("Connection successfully established.");
    app.listen(process.env.PORT || 8000, (err) => {
        if (err) console.log(err);
        console.log("Running successfully on port", process.env.PORT || 8000);
    });
})
.catch((error) => {
    console.log("Error:", error);
});

app.use(userRoute);
