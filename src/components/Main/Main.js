import React from "react";
import "./Main.css";
import card from "../../images/jeop-prep-questioncard.png";

function Main({}) {
  return (
    <main className="main">
      <section className="main__section" id="main-section">
        <div className="main__category-card">
          <p className="main__category-card-text">{`HOW IT WORKS`}</p>
        </div>

        <div className="main__answer-card">
          <p className="main__answer-card-text">
            {`ON THIS WEB APP, USERS CAN PRACTICE DAILY JEOPARDY QUESTIONS BY ENTERING RESPONSES, OR BY SIMPLY CLICKING THE CARD FOR THE CORRECT RESPONSE`}
          </p>
        </div>
        <form className="main__response-form">
          <label className="main__response-form-label">{`WHAT IS:`}</label>
          <input className="main__response-input"></input>
        </form>
      </section>
    </main>
  );
}

export default Main;
