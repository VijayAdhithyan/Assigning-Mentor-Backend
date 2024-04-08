import express from "express";
import {
  createMentor,
  getAllMentors,
  previousMentor,
} from "../controllers/mentor.controller.js";

const mentorRouter = express.Router();

/* get all mentor details */
mentorRouter.get("/", getAllMentors);

/* create mentor */
mentorRouter.post("/create", createMentor);

// show previous mentor for particular students
mentorRouter.post("/previous-mentor", previousMentor);

export default mentorRouter;
