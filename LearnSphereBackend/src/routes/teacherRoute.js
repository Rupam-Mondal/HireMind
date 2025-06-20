import express from "express";
import { createCourse, getCourses } from "../controllers/teacherController.js";

const teacherRouter = express.Router(); 

teacherRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Teacher Dashboard",
  });
});

teacherRouter.post("/create-course", createCourse);
teacherRouter.post("/get-courses", getCourses);

export default teacherRouter;