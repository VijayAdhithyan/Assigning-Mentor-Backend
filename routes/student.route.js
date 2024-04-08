import express from "express";
import {
  getAllStudents,
  createStudent,
  studentsWithNoMentor,
  assignMentor,
  mentorStudents,
  assingMultipleStudents,
} from "../controllers/student.controller.js";

const studentRouter = express.Router();

/*Get all students*/
studentRouter.get("/", getAllStudents);

/*Create Students */
studentRouter.post("/create", createStudent);

/*  List of students with no mentors */
studentRouter.get("/no-mentor", studentsWithNoMentor);

/* Assign or change Mentor for Student -- select one student and assign one mentor */
studentRouter.patch("/assign-mentor/:_id", assignMentor);

/* select one mentor and add to multiple students */
studentRouter.patch("/assign-mentor-students", assingMultipleStudents);

/* show all students for a particular mentor */
studentRouter.get("/mentor-students/:_id", mentorStudents);

export default studentRouter;
