const express = require('express');
const router = express.Router();

/* const DailyLog = require('../models/DailyLog.model.js');
const User = require("../models/User.model"); */
const MainFocus = require("../models/MainFocus.model.js") 

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Post new mainfocus events
router.post('/add-mainfocus', isAuthenticated, async (req,res)=>{
    const currentUser = req.payload;
    const userId = currentUser._id;
    try {
        const { name, category, icon } = req.body;

        const mainFocus = await MainFocus.create({
            name,
            category,
            icon,
            user: userId
        });

        const newMainFocus = await mainFocus.save();
        res.status(201).json(newMainFocus);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Get all nmainfocuses
router.get('/mainfocus/:userId', isAuthenticated, async (req,res)=>{
    const userId = req.params.userId;
    
    if(!userId){
        return res.status(400).json({"Error": "No user ID provided."});
    } else{
        try {
            const mainFocus = await MainFocus.find({user: userId});
            res.json(mainFocus);
        } catch(error) {
            res.status(400).json("Invalid mainfocus Id")
        }
    }
})

module.exports = router;
