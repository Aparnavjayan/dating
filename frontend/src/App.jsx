import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginuser from "./pages/login/Loginuser";
import Boarding from "./pages/BoardingScreen/Boarding";
import Signup from "./pages/signup/Signup";
import RegisterPage from "./pages/registerPage/RegisterPage";
import LongOrShortTerm from "./pages/longOrShortTerm/LongOrShortTerm";
import MoreAbout from "./pages/moreAbout/MoreAbout";
import AddPhotos from "./pages/addPhotos/AddPhotos";
import Employment from "./pages/employment/Employment";
import InterestedGender from "./pages/intrestedGender/InterestedGender";
import UserProfile from "./pages/userProfile/UserProfile";
import UserHome from "./pages/userHome/UserHome";


function App() {


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Boarding/>} />
        <Route  path="/login" element={<Loginuser />} />
        <Route  path="/signup" element={<Signup/>} />
        <Route  path="/register" element={<RegisterPage/>} />
        <Route  path="/relationship" element={<LongOrShortTerm/>} />
        <Route  path="/moreabout" element={<MoreAbout/>} />
        <Route  path="/addphoto" element={<AddPhotos/>} />
        <Route  path="/userprofile" element={<UserProfile/>} /> 
        <Route  path="/employment" element={<Employment/>} /> 
        <Route  path="/gender" element={<InterestedGender/>} />
        <Route  path="/userhome" element={<UserHome/>} />
      </Routes>
    </Router>
  );
}

export default App;
