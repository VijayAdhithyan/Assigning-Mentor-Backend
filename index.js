import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import mentorRouter from "./routes/mentor.route.js";
import studentRouter from "./routes/student.route.js";

const app = express();

dotenv.config();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(morgan("common"));

app.get("/", (req, res) =>
  res.send(`
<div>
<p>Assigning Mentor and Students server is running</p>
<p> To test Post and update - visit Frontend page of the application -<href to="https://assigning-mentors.netlify.app/" target="_blank"/> https://assigning-mentors.netlify.app/ </p>
</div>
`)
);

app.use("/mentor", mentorRouter);
app.use("/student", studentRouter);

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on Port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
