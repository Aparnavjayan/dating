import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import ServiceSelection from "./pages/serviceSelection/ServiceSelection";
import RequestPage from "./pages/RequestPage/RequestPage";
import ShortListPage from "./pages/ShortListPage/ShortListPage";
import MessagePage from "./pages/MessagePage/MessagePage";
import ProfileEditPage from "./pages/ProfileEditPage/ProfileEditPage";
import EcomUserHome from "./e-commerce/pages/userHome/EcomUserHome";


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
        <Route  path="/service" element={<ServiceSelection/>} />
        <Route  path="/userprofile/:userId" element={<UserProfile/>} /> 
        <Route  path="/employment" element={<Employment/>} /> 
        <Route  path="/gender" element={<InterestedGender/>} />
        <Route  path="/userhome" element={<UserHome/>} />
        <Route  path="/request" element={<RequestPage/>} />
        <Route  path="/shortlist" element={<ShortListPage/>} />
        <Route  path="/messages" element={<MessagePage/>} />
        <Route  path="/editprofile" element={<ProfileEditPage/>} />
        <Route  path="/ecomhome" element={<EcomUserHome/>} />
      </Routes>
    </Router>
  );
}

export default App;
