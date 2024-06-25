import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginuser from "./pages/login/Loginuser";
import Boarding from "./pages/BoardingScreen/Boarding";
import Signup from "./pages/signup/Signup";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LongOrShortTerm from "./pages/longOrShortTerm/LongOrShortTerm";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Boarding/>} />
        <Route  path="/login" element={<Loginuser />} />
        <Route  path="/signup" element={<Signup/>} />
        <Route  path="/register" element={<RegisterPage/>} />
        <Route  path="/relationship" element={<LongOrShortTerm/>} />
      </Routes>
    </Router>
  );
}

export default App;
