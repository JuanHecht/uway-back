const { Schema, model } = require("mongoose");


const dailyLogSchema = new Schema(
    {
        mood: {
          type: Number,
          required: [true, "Mood is required"]
        },
        bedTime: {
          type: Object,
          required: [true, "Bedtime is required"],
        },
        energyLevel: {
          type: Number,
          required: [true, "Energy is required"],
        },
        mainFocus: {
          type: String,
          required: [true, "Main focus is required"],
        },
        activities: {
          type: Array
        },
        goals: {
          type: Array
        },
        notes: {
          type: String,
          required: [true, "At least one word is required"]
        }
      },
      {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
      }
);

const DailyLog = model("DailyLog", dailyLogSchema);

module.exports = DailyLog;
