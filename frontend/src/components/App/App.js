import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import React from "react";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import DailyDouble from "../DailyDouble/DailyDouble";
import DailyFinal from "../DailyFinal/DailyFinal";
import { currentDate } from "../../utils/constants";
import { fetchSelectedFinal, fetchSelectedDouble } from "../../utils/cluebase";

function App() {
  const [dailyDouble, setDailyDouble] = React.useState({});
  const [dailyFinal, setDailyFinal] = React.useState({});
  const [finalIsLoading, setFinalIsLoading] = React.useState(false);
  const [doubleIsLoading, setDoubleIsLoading] = React.useState(true);

  const dateData = new Date().toLocaleString("default", {
    month: "numeric",
    day: "numeric",
  });

  React.useEffect(() => {
    let dateSeed = dateData.split("/").join("");
    console.log(dateSeed);
    const seedFinalId = Math.floor(Math.abs(Math.sin(dateSeed)) * 300000);
    const seedDoubleId = Math.floor(Math.abs(Math.cos(dateSeed)) * 300000);
    setFinalIsLoading(true);
    fetchSelectedFinal(seedFinalId)
      .then((data) => {
        console.log(data);
        setDailyFinal(data.data[0]);
      })
      .catch((err) => console.error(err))
      .finally(setFinalIsLoading(false));
    setDoubleIsLoading(true);
    fetchSelectedDouble(seedDoubleId)
      .then((data) => {
        console.log(data);
        setDailyDouble(data.data[0]);
      })
      .catch((err) => console.error(err))
      .finally(setDoubleIsLoading(false));
  }, [dateData]);

  return (
    <div className="page">
      <Header currentDate={currentDate} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          exact
          path="/ddd"
          element={
            <DailyDouble data={dailyDouble} isLoading={doubleIsLoading} />
          }
        />
        <Route
          exact
          path="/df"
          element={<DailyFinal data={dailyFinal} isLoading={finalIsLoading} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
