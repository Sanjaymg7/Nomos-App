import { useState } from "react";
import { ModalContext } from "./Components/Context/Context";
import { modalInitialState } from "./Library/Constants";
import { BrowserRouter, Routes } from "react-router-dom";
import { appRoutes } from "./Components/Router/Router";

const App = () => {
  const [modal, setModal] = useState(modalInitialState);
  return (
    <BrowserRouter>
      <ModalContext.Provider value={[modal, setModal]}>
        <Routes>{appRoutes}</Routes>
      </ModalContext.Provider>
    </BrowserRouter>
  );
};

export default App;
