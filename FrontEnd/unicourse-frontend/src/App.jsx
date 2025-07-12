import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRegistrationForm from "./components/StudentRegistrationForm"; // check path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<StudentRegistrationForm />} />
      </Routes>
    </Router>
  );
}
export default App;
