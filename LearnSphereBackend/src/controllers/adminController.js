import Course from "../services/courseModel.js";

const adminLogin = (req, res) => {
    const { adminPassword } = req.body;

    const correctPassword = process.env.ADMIN_PASSWORD;
    if (!correctPassword) {
        return res.status(500).json({ message: "Admin password is not set." });
    }
    if (adminPassword === correctPassword) {
        res.status(200).json({success:true, message: "Login successful", token: "token" });
    } else {
        res.status(401).json({success:false, message: "Invalid admin password" });
    }
}

const pendingCourses = async (req, res) => {
    try {
        const courses = await Course.find({ status: "PENDING" }).populate("teacher", "username email");
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error("Error fetching pending courses:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const approveCourse = async (req, res) => {
    const { courseId } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.status = "APPROVED";
        await course.save();

        res.status(200).json({ success: true, message: "Course approved successfully" });
    } catch (error) {
        console.error("Error approving course:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const rejectCourse = async (req, res) => {
    const { courseId } = req.body;
    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        course.status = "REJECTED";
        await course.save();

        res.status(200).json({ success: true, message: "Course rejected successfully" });
    } catch (error) {
        console.error("Error rejecting course:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export { adminLogin, pendingCourses, approveCourse, rejectCourse };