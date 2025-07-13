import React, { useEffect, useState } from "react";
import {
  Grid, Card, CardContent, Typography, CardActions,
  Button, Box, CircularProgress, Alert
} from "@mui/material";
import api from "./utils/api";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Assume you store studentId in localStorage after login
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchMyCourses = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch all enrollments for the student
        const enrollments = await api.get(`/enrollments/student/${studentId}`, true);
        // Extract courses
        const myCourses = enrollments.map(e => e.course || e); // handle different API structures
        setCourses(Array.isArray(myCourses) ? myCourses : []);
      } catch (err) {
        setError("Failed to load registered courses.");
      }
      setLoading(false);
    };
    fetchMyCourses();
  }, [studentId]);

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
        My Registered Courses
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={3}>
        {courses.length === 0 ? (
          <Grid item xs={12}>
            <Alert severity="info">You are not enrolled in any courses yet.</Alert>
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
                  <Button size="small" color="secondary" sx={{ borderRadius: 2 }}>View</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyCourses;
