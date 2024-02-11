import "./Cards.css";
import React from "react";

function Cards({ categoryText, answerText, responseText }) {
  const [revealResponse, setRevealResponse] = React.useState(false);
  const [userResponse, setUserResponse] = React.useState("");
  const [responseStatus, setResponseStatus] = React.useState("");

  const onRevealResponse = () => {
    setRevealResponse(true);
  };

  const onTryAgain = () => {
    setResponseStatus("");
  };

  const onEnterResponse = (e) => {
    e.preventDefault();
    const correct = compareResponses();
    if (correct) {
      setRevealResponse(true);
    }
  };

  const compareResponses = () => {
    if (responseText.toUpperCase().includes(userResponse.toUpperCase())) {
      setResponseStatus("correct");
      return true;
    } else {
      setResponseStatus("incorrect");
      return false;
    }
  };

  return (
    <div className="cards">
      <section className="cards__section">
        <div className="cards__category-card">
          <p className="cards__category-card-text">{categoryText}</p>
        </div>
        <div
          className={`cards__answer-card cards__answer-card-${responseStatus}`}
        >
          <p className="cards__answer-card-text">
            {!revealResponse
              ? answerText?.toUpperCase()
              : `WHAT IS: ${responseText?.toUpperCase()}`}
          </p>
        </div>
        {responseStatus === "" && (
          <form className="cards__response-form" onSubmit={onEnterResponse}>
            <label className="cards__response-form-label">{`WHAT IS:`}</label>
            <div className="cards__response-input-container">
              <input
                className="cards__response-input"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              ></input>
              <p className="cards__response-question-mark">{`?`}</p>
            </div>
          </form>
        )}
        {responseStatus === "correct" && (
          <div className="cards__caption">
            <p className="cards__caption-text">{`CORRECT!`}</p>
          </div>
        )}
        {responseStatus === "incorrect" && (
          <div className="cards__caption">
            <p className="cards__caption-text">{`INCORRECT.`}</p>
            <div className="cards__caption-buttons-container">
              <button
                className="cards__caption-button"
                onClick={onRevealResponse}
              >{`REVEAL ANSWER`}</button>
              <button className="cards__caption-button" onClick={onTryAgain}>
                {`TRY AGAIN`}{" "}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cards;
