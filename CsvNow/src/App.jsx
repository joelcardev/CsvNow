import AppBarResponsivo from "./components/AppBar";
import Home from "./pages/home/Home";
import { CssBaseline } from "@mui/material/";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
function App() {
  return (
    <>
      <CssBaseline>
        <AppBarResponsivo />
        <Home />
        <ToastContainer />
      </CssBaseline>
    </>
  );
}

export default App;
