const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const goalsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    notes: {
        type: String,
        required: [true, "notes is required."],
    },
    recurring: {
        type: Number,
        required: [true, "recurring is required."],
    },
    icon: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
      }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Goals = model("Goals", goalsSchema);

module.exports = Goals;