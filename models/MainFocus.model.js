const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const mainFocusSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    category: {
      type: String,
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

const MainFocus = model("MainFocus", mainFocusSchema);

module.exports = MainFocus;
