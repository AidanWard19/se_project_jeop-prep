import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import React from "react";
import Footer from "../Footer/Footer";
import { Route, Routes } from "react-router-dom";
import DailyDouble from "../DailyDouble/DailyDouble";
import DailyFinal from "../DailyFinal/DailyFinal";
import DailyCategory from "../DailyCategory/DailyCategory";
import { currentDate } from "../../utils/constants";
import {
  fetchSelectedFinal,
  fetchSelectedDouble,
  fetchDailyCategory,
} from "../../utils/cluebase";

function App() {
  const [dailyDouble, setDailyDouble] = React.useState({});
  const [dailyFinal, setDailyFinal] = React.useState({});
  const [dailyCategory, setDailyCategory] = React.useState({ category: "", clues: [] });

  const [finalIsLoading, setFinalIsLoading] = React.useState(true);
  const [doubleIsLoading, setDoubleIsLoading] = React.useState(true);
  const [categoryIsLoading, setCategoryIsLoading] = React.useState(true);

  const dateData = new Date().toLocaleString("default", {
    month: "numeric",
    day: "numeric",
  });

  React.useEffect(() => {
    // Produce three distinct seeds from today's date:
    //   sin  → Final Jeopardy
    //   cos  → Daily Double
    //   tan  → Daily Category  (clamped so it doesn't blow up near asymptotes)
    const dateSeed = dateData.split("/").join("");
    const seedFinalId    = Math.floor(Math.abs(Math.sin(dateSeed)) * 300000);
    const seedDoubleId   = Math.floor(Math.abs(Math.cos(dateSeed)) * 300000);
    const seedCategoryId = Math.floor((Math.abs(Math.tan(dateSeed)) % 1) * 300000);

    setFinalIsLoading(true);
    fetchSelectedFinal(seedFinalId)
      .then((data) => setDailyFinal(data.data[0]))
      .catch((err) => console.error(err))
      .finally(() => setFinalIsLoading(false));

    setDoubleIsLoading(true);
    fetchSelectedDouble(seedDoubleId)
      .then((data) => setDailyDouble(data.data[0]))
      .catch((err) => console.error(err))
      .finally(() => setDoubleIsLoading(false));

    setCategoryIsLoading(true);
    fetchDailyCategory(seedCategoryId)
      .then((data) => setDailyCategory(data))
      .catch((err) => console.error(err))
      .finally(() => setCategoryIsLoading(false));
  }, [dateData]);

  return (
    <div className="page">
      <Header currentDate={currentDate} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/ddd"
          element={<DailyDouble data={dailyDouble} isLoading={doubleIsLoading} />}
        />
        <Route
          path="/df"
          element={<DailyFinal data={dailyFinal} isLoading={finalIsLoading} />}
        />
        <Route
          path="/dc"
          element={
            <DailyCategory
              category={dailyCategory.category}
              clues={dailyCategory.clues}
              isLoading={categoryIsLoading}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
