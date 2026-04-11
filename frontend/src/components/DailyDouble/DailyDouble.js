import Cards from "../Cards/Cards";
import "./DailyDouble.css";
import Preloader from "../Preloader/Preloader";

function DailyDouble({ data, isLoading }) {
  return !isLoading ? (
    <Cards
      categoryText={data.category}
      answerText={data.clue}
      responseText={data.response}
      value={data.value}
    />
  ) : (
    <Preloader />
  );
}

export default DailyDouble;
