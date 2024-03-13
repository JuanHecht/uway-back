const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const activitiesSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
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

const Activities = model("Activities", activitiesSchema);

module.exports = Activities;