import React, { useEffect, useState } from "react";
import {
  Grid, Card, CardContent, Typography, CardActions,
  Button, Box, CircularProgress, Alert
} from "@mui/material";
import api from "./utils/api";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]); // IDs of enrolled courses
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError("");
      try {
        const [allCourses, myEnrollments] = await Promise.all([
          api.get("/courses", true),
          api.get(`/enrollments/student/${studentId}`, true)
        ]);
        setCourses(Array.isArray(allCourses) ? allCourses : []);
        setEnrolled((myEnrollments || []).map(e => (e.course?.id || e.courseId || e.id)));
      } catch (err) {
        setError("Failed to load courses.");
        setCourses([]);
      }
      setLoading(false);
    };
    fetchCourses();
  }, [studentId, enrolling]); // re-fetch after enrolling

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    setMessage("");
    setError("");
    try {
      await api.post("/enrollments", { studentId: Number(studentId), courseId: Number(courseId) }, true);
      setMessage("Enrolled successfully!");
    } catch {
      setError("Enrollment failed.");
    }
    setEnrolling(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 600 }}>
        All Available Courses
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      <Grid container spacing={3}>
        {courses.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">No courses found.</Alert>
          </Grid>
        ) : (
          courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                elevation={5}
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.04)" }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{course.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {enrolled.includes(course.id) ? (
                    <Button disabled size="small" color="success" sx={{ borderRadius: 2 }}>Enrolled</Button>
                  ) : (
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      sx={{ borderRadius: 2 }}
                      disabled={enrolling === course.id}
                      onClick={() => handleEnroll(course.id)}
                    >
                      {enrolling === course.id ? <CircularProgress size={18} /> : "Enroll"}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default AllCourses;
