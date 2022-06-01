import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInOrSignUp from "./Pages/SignInOrSignUp";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <div container="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignInOrSignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
