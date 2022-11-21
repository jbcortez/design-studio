import React, { Fragment } from "react";
import DesignStudio from "./pages/DesignStudio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/main.scss";

const App: React.FC = () => {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/design" element={<DesignStudio />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;
