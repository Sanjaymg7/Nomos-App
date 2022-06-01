import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInOrSignUp from "./Pages/SignInOrSignUp";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
function App() {
  return (
    <div container="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignInOrSignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
