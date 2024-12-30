const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router =express.Router();

// POST Route
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age,
        });
        res.status(201).json(userAdded); // Send the created user with a 201 status
    } catch (error) {
        res.status(400).json({ error: error.message }); // Use status(400) for errors
    }
});

// GET Route
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll); // Send all users with a 200 status
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Root Route for API Status
router.get("/status", (req, res) => {
    res.send("API is running.");
});

//get single user
router.get("/:id", async (req, res) => {
    const {id} =req.params;
    try {
        const singleUser = await User.findById({_id:id});
        res.status(200).json(singleUser); // Send all users with a 200 status
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete
router.delete("/:id", async (req, res) => {
    const {id} =req.params;
    try {
        const singleUser= await User.findByIdAndDelete({_id:id});
        res.status(200).json(singleUser); // Send all users with a 200 status
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update
router.patch("/:id", async (req, res) => {
    const {id} =req.params;
    try {
        const updateUser= await User.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        res.status(200).json(updateUser); // Send all users with a 200 status
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router;
