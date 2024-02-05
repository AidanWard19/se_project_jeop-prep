import "./Cards.css";

function Cards({ categoryText, answerText }) {
  return (
    <section className="cards__section">
      <div className="cards__category-card">
        <p className="cards__category-card-text">{categoryText}</p>
      </div>

      <div className="cards__answer-card">
        <p className="cards__answer-card-text">{answerText}</p>
      </div>
      <form className="cards__response-form">
        <label className="cards__response-form-label">{`WHAT IS:`}</label>
        <div className="cards__response-input-container">
          <input className="cards__response-input"></input>
          <p className="cards__response-question-mark">{`?`}</p>
        </div>
      </form>
    </section>
  );
}

export default Cards;
