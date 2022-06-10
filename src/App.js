import { BrowserRouter, Routes } from "react-router-dom";
import { appRoutes } from "./Components/Router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>{appRoutes}</Routes>
    </BrowserRouter>
  );
};

export default App;
