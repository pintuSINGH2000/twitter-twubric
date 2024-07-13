import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import TwubricPage from "./pages/TwubricPage";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TwubricPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
