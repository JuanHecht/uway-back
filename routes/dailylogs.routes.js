const express = require('express');
const router = express.Router();

const DailyLog = require('../models/DailyLog.model.js');
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Post new dailylogs for the user that is currently logged in
router.post('/dailylogs', isAuthenticated, async (req, res) => {
    if (!userID) {
        return res.status(400).json({ "Error": "No user ID provided." });
    } else {
        try {
            const { mood, bedTime, energyLevel, mainFocus, activities, goals, notes } = req.body;

            // Access user information from the request payload
            const currentUser = req.payload;
            const userId = currentUser._id;

            // Create the daily log associated with the current user
            const dailyLog = await DailyLog.create({
                mood,
                bedTime,
                energyLevel,
                mainFocus,
                activities,
                goals,
                notes,
                user: userId
            });

            // Save the daily log
            const newDailyLog = await dailyLog.save();

            res.status(201).json(newDailyLog);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
});

//   Get  all of a users daily logs
router.get("/dailylogs/:userId", isAuthenticated, async (req, res) => {
    const userID = req.params.userId;

    if (!userID) {
        return res.status(400).json({ "Error": "No user ID provided." });
    } else {
        try {
            const userDailyLogs = await DailyLog.find({ user: userID }).sort('-date');

            if (!userDailyLogs) {
                return res.status(404).json("No daily logs found.");
            }

            res.json(userDailyLogs);
        } catch (error) {
            console.log(error);
            res.sendStatus(500)
        }
    }
})

module.exports = router;
