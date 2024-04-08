import Student from "../models/student.model.js";
import Mentor from "../models/mentor.model.js";

/*Get all students*/
export const getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find();
    const students = [];
    allStudents.forEach((student) => {
      students.push({
        _id: student._id,
        name: student.name,
        email: student.email,
        batch: student.batch,
        mentor: student.mentor,
        previousMentor: student.previousMentor,
      });
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/*Create Students */
export const createStudent = async (req, res) => {
  const { name, batch, email } = req.body;

  try {
    const newStudent = await Student.create({ name, batch, email });
    res
      .status(200)
      .json([{ message: "Student created successfully" }, newStudent]);
  } catch (error) {
    res.status(500).json(error);
  }
};

/*  List of students with no mentors */
export const studentsWithNoMentor = async (req, res) => {
  try {
    const students = await Student.find({ mentor: undefined });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* Assign or change Mentor for Student -- select one student and assign one mentor */
export const assignMentor = async (req, res) => {
  const { _id } = req.params;
  const { mentorId } = req.body;

  try {
    const student = await Student.findById(_id);
    const mentor = await Mentor.findById(mentorId);

    if (student.mentor) {
      if (student.mentor.equals(mentor._id)) {
        return res.status(404).json({ message: "Choice different mentor" });
      } else {
        student.previousMentor = student.mentor;
        student.mentor = mentorId;
        await student.save();
        return res.status(200).json({ message: "mentor changed successfully" });
      }
    } else {
      student.mentor = mentorId;
      await student.save();
      return res.status(200).json({ message: "mentor assigned successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/* select one mentor and add to multiple students */
export const assingMultipleStudents = async (req, res) => {
  const { mentor, studentList } = req.body;
  try {
    studentList.map(async (student) => {
      const stud = await Student.findById(student);
      stud.mentor = mentor;
      await stud.save();
    });
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

/* show all students for a particular mentor */
export const mentorStudents = async (req, res) => {
  const { _id } = req.params;
  try {
    const students = await Student.find({ mentor: _id });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};
