import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginuser from "./pages/login/Loginuser";
import Boarding from "./pages/BoardingScreen/Boarding";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Boarding/>} />
        <Route exact path="/login" element={<Loginuser />} />
      </Routes>
    </Router>
  );
}

export default App;
