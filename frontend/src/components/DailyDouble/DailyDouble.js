import Cards from "../Cards/Cards";
import "./DailyDouble.css";
import Preloader from "../Preloader/Preloader";

function DailyDouble({ data, isLoading }) {
  console.log(isLoading);
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
export default DailyDouble;
