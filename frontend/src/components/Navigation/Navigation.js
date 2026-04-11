import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <Link className="navigation__link" to="/ddd">
        <div className="navigation__item">{`Daily Daily-Double`}</div>
      </Link>
      <Link className="navigation__link" to="/df">
        <div className="navigation__item">{`Daily Final Jeopardy`}</div>
      </Link>
      <Link className="navigation__link" to="/dc">
        <div className="navigation__item">{`Daily Category`}</div>
      </Link>
    </div>
  );
};

export default Navigation;
