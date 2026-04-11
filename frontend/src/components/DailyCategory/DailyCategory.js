import React from "react";
import "./DailyCategory.css";
import Preloader from "../Preloader/Preloader";

// phase: "idle" → "clue" → "done"
function CategoryCard({ clue }) {
  const [phase, setPhase] = React.useState("idle");
  const [userResponse, setUserResponse] = React.useState("");
  const [responseStatus, setResponseStatus] = React.useState("");

  const revealClue = () => setPhase("clue");

  const onSubmit = (e) => {
    e.preventDefault();
    if (clue.response.toUpperCase().includes(userResponse.toUpperCase())) {
      setResponseStatus("correct");
      setPhase("done");
    } else {
      setResponseStatus("incorrect");
    }
  };

  const onRevealAnswer = () => {
    setPhase("done");
    setResponseStatus("revealed");
  };

  const onTryAgain = () => {
    setResponseStatus("");
    setUserResponse("");
  };

  const glowClass =
    responseStatus === "correct"
      ? "dc-card--correct"
      : responseStatus === "incorrect"
      ? "dc-card--incorrect"
      : "";

  return (
    <div className={`dc-card ${glowClass}`}>

      {/* ── IDLE: full-card dollar amount, click to reveal ── */}
      {phase === "idle" && (
        <div className="dc-card__idle" onClick={revealClue}>
          <span className="dc-card__dollar">
            {clue.value ? `$${clue.value.toLocaleString()}` : "?"}
          </span>
        </div>
      )}

      {/* ── CLUE: show the question + answer form ── */}
      {phase === "clue" && (
        <div className="dc-card__expanded">
          <p className="dc-card__clue">{clue.clue.toUpperCase()}</p>

          {responseStatus === "" && (
            <form className="dc-card__form" onSubmit={onSubmit}>
              <label className="dc-card__label">WHAT IS:</label>
              <div className="dc-card__input-row">
                <input
                  className="dc-card__input"
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  autoFocus
                />
                <span className="dc-card__qmark">?</span>
              </div>
            </form>
          )}

          {responseStatus === "incorrect" && (
            <div className="dc-card__actions">
              <p className="dc-card__feedback dc-card__feedback--incorrect">
                INCORRECT.
              </p>
              <div className="dc-card__buttons">
                <button className="dc-card__btn" onClick={onRevealAnswer}>
                  REVEAL ANSWER
                </button>
                <button className="dc-card__btn" onClick={onTryAgain}>
                  TRY AGAIN
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── DONE: clue + answer revealed ── */}
      {phase === "done" && (
        <div className="dc-card__expanded">
          <p className="dc-card__clue">{clue.clue.toUpperCase()}</p>
          <p className="dc-card__answer">
            {`WHAT IS: ${clue.response.toUpperCase()}`}
          </p>
          {responseStatus === "correct" && (
            <p className="dc-card__feedback dc-card__feedback--correct">
              CORRECT!
            </p>
          )}
        </div>
      )}

    </div>
  );
}

function DailyCategory({ category, clues, isLoading }) {
  if (isLoading) return <Preloader />;

  return (
    <div className="dc">
      <div className="dc__category-box">
        <p className="dc__category-box-text">{category}</p>
      </div>
      <p className="dc__subtitle">{clues.length} clues across all rounds</p>

      <div className="dc__stack">
        {clues.map((clue, i) => (
          <CategoryCard key={i} clue={clue} />
        ))}
      </div>
    </div>
  );
}

export default DailyCategory;
