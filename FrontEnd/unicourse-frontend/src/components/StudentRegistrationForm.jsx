import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography, Paper } from "@mui/material";

const StudentRegistrationForm = () => {
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    courseId: "",
  });

  useEffect(() => {
    // Fetch courses from backend
    fetch("http://localhost:8080/courses") // Ensure your backend path is correct
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: student.name,
        studentEmail: student.email,
        courseId: student.courseId,
      }),
    })
      .then((res) => {
        if (res.ok) alert("Registration Successful!");
        else alert("Registration Failed.");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        bgcolor: "#222",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
          Student Registration
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            fullWidth
            autoComplete="off"
          />
          <TextField
            label="Email"
            name="email"
            value={student.email}
            onChange={handleChange}
            type="email"
            required
            fullWidth
            autoComplete="off"
          />
          <TextField
            select
            label="Course"
            name="courseId"
            value={student.courseId}
            onChange={handleChange}
            required
            fullWidth
          >
            <MenuItem value="">Select a course</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.code} - {course.title}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              fontWeight: "bold",
              bgcolor: "primary.main",
              boxShadow: "0px 2px 8px rgba(30, 136, 229, 0.2)",
              borderRadius: 2,
            }}
            fullWidth
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentRegistrationForm;
