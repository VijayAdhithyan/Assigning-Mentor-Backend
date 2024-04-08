import Mentor from "../models/mentor.model.js";

// Create mentor
export const createMentor = async (req, res) => {
  const { name, email, course } = req.body;

  try {
    const newMentor = await Mentor.create({ name, email, course });
    res
      .status(200)
      .json([{ message: "Mentor created successfully" }, newMentor]);
  } catch (error) {
    res.status(500).json(error);
  }
};

/*Get all mentors*/
export const getAllMentors = async (req, res) => {
  try {
    const allMentors = await Mentor.find();
    const mentors = [];
    allMentors.forEach((mentor) => {
      mentors.push({
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        course: mentor.course,
      });
    });
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json(error);
  }
};

// show previous mentor for particular students
export const previousMentor = async (req, res) => {
  const { mentorId } = req.body;
  try {
    const mentor = await Mentor.findById(mentorId);
    res.status(200).json([mentor]);
  } catch (error) {
    res.status(500).json(error);
  }
};
