import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/Auth/AuthPage";
import CoursesPage from "./components/CoursesPage"; // Create this component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
