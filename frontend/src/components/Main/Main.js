import React from "react";
import "./Main.css";
import Cards from "../Cards/Cards";
import {
  homepageAnswer,
  homepageCategory,
  homepageResponse,
} from "../../utils/constants";

function Main({}) {
  return (
    <main className="main">
      <Cards
        answerText={homepageAnswer}
        categoryText={homepageCategory}
        responseText={homepageResponse}
      />
    </main>
  );
}

export default Main;
