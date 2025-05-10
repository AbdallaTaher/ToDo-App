const mongoose = require("mongoose");
const { Schema } = mongoose;
const toDoSchema = new Schema(
  {
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    completedOn: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", toDoSchema);
module.exports = Todo;
