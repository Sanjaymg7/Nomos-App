import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./Pages/Intro";
import SignIn from "./Pages/LogIn/SignIn";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Intro />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
