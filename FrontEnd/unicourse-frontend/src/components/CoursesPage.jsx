import React, { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import AllCourses from "./AllCourses";
import MyCourses from "./MyCourses";
import Header from "./Header"; // <-- Add this import

const CoursesPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Header /> {/* Add your header at the top */}
      <Container sx={{ mt: 5 }}>
        <Box sx={{ width: "100%", mb: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            centered
            textColor="primary"
            indicatorColor="primary"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="My Registered Courses" />
            <Tab label="All Courses" />
          </Tabs>
        </Box>
        {tab === 0 && <MyCourses />}
        {tab === 1 && <AllCourses />}
      </Container>
    </>
  );
};

export default CoursesPage;
