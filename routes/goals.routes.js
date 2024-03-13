const express = require('express');
const router = express.Router();

/* const DailyLog = require('../models/DailyLog.model.js');
const User = require("../models/User.model"); */
const MainFocus = require("../models/MainFocus.model.js") 
const Activities = require("../models/Activities.model.js")
const Goals = require("../models/Goals.model.js")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//////////////////////////////////// MAINFOCUS ////////////////////////////////////
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

//////////////////////////////// ACTIVITIES ////////////////////////////////////////
// Post new activities
router.post('/add-activities', isAuthenticated, async (req,res)=>{
    const currentUser = req.payload;
    const userId = currentUser._id;
    try {
        const { name, category, icon } = req.body;

        const activity = await Activities.create({
            name,
            category,
            icon,
            user: userId
        });

        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Get all activities
router.get('/activities/:userId', isAuthenticated, async (req,res)=>{
    const userId = req.params.userId;
    
    if(!userId){
        return res.status(400).json({"Error": "No user ID provided."});
    } else{
        try {
            const activity = await Activities.find({user: userId});
            res.json(activity);
        } catch(error) {
            res.status(400).json("Invalid mainfocus Id")
        }
    }
})


//////////////////////////////////// GOALS ////////////////////////////////////
router.post('/add-goals', isAuthenticated, async (req,res)=>{
    const currentUser = req.payload;
    const userId = currentUser._id;
    try {
        const { name, category, notes, recurring, icon } = req.body;

        const goal = await Goals.create({
            name,
            category,
            notes,
            recurring,
            icon,
            user: userId
        });

        const newGoal = await goal.save();
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

// Get all nmainfocuses
router.get('/goals/:userId', isAuthenticated, async (req,res)=>{
    const userId = req.params.userId;
    
    if(!userId){
        return res.status(400).json({"Error": "No user ID provided."});
    } else{
        try {
            const mainFocus = await Goals.find({user: userId});
            res.json(mainFocus);
        } catch(error) {
            res.status(400).json("Invalid mainfocus Id")
        }
    }
})

module.exports = router;
