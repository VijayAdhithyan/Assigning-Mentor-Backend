import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    default: undefined,
    ref: "Mentor",
  },
  previousMentor: {
    type: mongoose.Schema.Types.ObjectId,
    default: undefined,
    ref: "Mentor",
  },
});

export default mongoose.model("Student", studentSchema);
