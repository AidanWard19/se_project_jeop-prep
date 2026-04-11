import "./Cards.css";
import React from "react";

function Cards({ categoryText, answerText, responseText, value }) {
  // phase: "idle" (show dollar) → "clue" (show question + form) → handled via revealResponse
  const [phase, setPhase] = React.useState(value ? "idle" : "clue");
  const [revealResponse, setRevealResponse] = React.useState(false);
  const [userResponse, setUserResponse] = React.useState("");
  const [responseStatus, setResponseStatus] = React.useState("");

  const onRevealClue = () => setPhase("clue");
  const onRevealResponse = () => setRevealResponse(true);
  const onTryAgain = () => setResponseStatus("");

  const onEnterResponse = (e) => {
    e.preventDefault();
    if (responseText.toUpperCase().includes(userResponse.toUpperCase())) {
      setResponseStatus("correct");
      setRevealResponse(true);
    } else {
      setResponseStatus("incorrect");
    }
  };

  return (
    <div className="cards">
      <section className="cards__section">

        {/* Category box */}
        <div className="cards__category-card">
          <p className="cards__category-card-text">{categoryText}</p>
        </div>

        {/* Answer card — idle shows dollar, clue phase shows question */}
        <div className={`cards__answer-card cards__answer-card-${responseStatus}`}>
          {phase === "idle" ? (
            <div className="cards__idle" onClick={onRevealClue}>
              <p className="cards__dollar">{`$${value.toLocaleString()}`}</p>
            </div>
          ) : (
            <p className="cards__answer-card-text">
              {!revealResponse
                ? answerText?.toUpperCase()
                : `WHAT IS: ${responseText?.toUpperCase()}`}
            </p>
          )}
        </div>

        {/* Answer form — only shown in clue phase, before answering */}
        {phase === "clue" && responseStatus === "" && (
          <form className="cards__response-form" onSubmit={onEnterResponse}>
            <label className="cards__response-form-label">{`WHAT IS:`}</label>
            <div className="cards__response-input-container">
              <input
                className="cards__response-input"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                autoFocus
              />
              <p className="cards__response-question-mark">{`?`}</p>
            </div>
          </form>
        )}

        {responseStatus === "correct" && (
          <div className="cards__caption">
            <p className="cards__caption-text-correct">{`CORRECT!`}</p>
          </div>
        )}

        {responseStatus === "incorrect" && (
          <div className="cards__caption">
            <p className="cards__caption-text">{`INCORRECT.`}</p>
            <div className="cards__caption-buttons-container">
              <button className="cards__caption-button" onClick={onRevealResponse}>
                {`REVEAL ANSWER`}
              </button>
              <button className="cards__caption-button" onClick={onTryAgain}>
                {`TRY AGAIN`}
              </button>
            </div>
          </div>
        )}

      </section>
    </div>
  );
}

export default Cards;
