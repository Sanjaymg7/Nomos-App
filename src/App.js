import { useState, createContext } from "react";
import { modalInitialState } from "./Library/Constants";
import { BrowserRouter, Routes } from "react-router-dom";
import { appRoutes } from "./Components/Router/Router";

export const ModalContext = createContext();

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
