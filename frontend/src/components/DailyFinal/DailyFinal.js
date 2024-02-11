import "./DailyFinal.css";
import Cards from "../Cards/Cards";
import Preloader from "../Preloader/Preloader";

function DailyFinal({ data, isLoading }) {
  return !isLoading ? (
    <Cards
      categoryText={data.category}
      answerText={data.clue}
      responseText={data.response}
      isLoading={isLoading}
    />
  ) : (
    <Preloader />
  );
}
export default DailyFinal;
