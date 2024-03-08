const express = require('express');
const router = express.Router();

const DailyLog = require('../models/DailyLog.model.js');
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// Post new dailylogs for the user that is currently logged in
router.post('/dailylogs', isAuthenticated, async (req, res) => {
    // Access user information from the request payload
    const currentUser = req.payload;
    const userId = currentUser._id;
    if (!userId) {
        return res.status(400).json({ "Error": "No user ID provided." });
    } else {
        try {
            const { mood, bedTime, energyLevel, mainFocus, activities, goals, notes } = req.body;

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
});

router.get("/dailylogs/logdetail/:dailylogId", async (req, res) => {
    const { dailylogId } = req.params;
    try {
        const  dailyLog = await DailyLog.findById(dailylogId);
        
        if(!dailyLog){
            return res.status(404).json("The specified daily log does not exist.")
        }

        res.json(dailyLog);
    }catch{
        res.status(400).json("Invalid daily log id")
    }
})


router.put("/dailylogs/:dailylogId", (req, res) => {
    // Object destructuring
    const { dailylogId } = req.params;
    const { mood,
        bedTime,
        energyLevel,
        mainFocus,
        activities,
        goals,
        notes } = req.body;

    DailyLog
        .findByIdAndUpdate(dailylogId, {
            mood, bedTime,
            energyLevel,
            mainFocus,
            activities,
            goals,
            notes
        }, { new: true })
        .then(() => {
            res.json({ message: "updated" });
        })
        .catch(() => {
            res.json({ message: "Failed to Update ." });
        });
});

router.delete("/dailylogs/:dailylogId", (req, res) => {
    const {dailylogId } = req.params;
  
    DailyLog
      .findByIdAndDelete(dailylogId)
      .then(() => {
        res.json({ message: "log deleted" });
      })
      .catch(() => {
        res.json({ error: "Failed to delete a log" });
      });
  });



module.exports = router;
