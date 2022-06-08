import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./Pages/Intro/Intro/Intro";
import SignIn from "./Pages/LogIn/SignIn";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home/Home";
import Post from "./Pages/Post/Post";
import Chat from "./Pages/Chat/Chat";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword/ResetPassword";

const App = () => {
  //   const routes = [{
  //     path:"/",
  //     component:<Intro />
  //   },{
  //     path:"/signin",
  //     component:<SignIn />
  //   },{
  //     path:"/forgotpassword",
  //     component:<ResetPassword/>
  //   },{
  //     path:"/signup",
  //     component:<Register />
  //   },{
  //     path:"/home",
  //     component:<Home />
  //   },{
  //     path:"/post",
  //     component:<Post />
  //   },{
  //     path:"/chat",
  //     component:<Chat />
  //   }];
  //   const routeComponents= routes.map(({path, component}, key) =><Route exact path={path} element={component} key={key} />)
  return (
    <BrowserRouter>
      <Routes>
        {/* {routeComponents} */}
        <Route exact path="/" element={<Intro />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/forgotpassword" element={<ResetPassword />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/post" element={<Post />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
