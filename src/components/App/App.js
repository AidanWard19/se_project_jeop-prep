import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import React from "react";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import DailyDouble from "../DailyDouble/DailyDouble";
import DailyFinal from "../DailyFinal/DailyFinal";

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/ddd" element={<DailyDouble />} />
        <Route exact path="/df" element={<DailyFinal />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
