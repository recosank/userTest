import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/details/:id" element={<Detail update={true} />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<Detail update={false} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
