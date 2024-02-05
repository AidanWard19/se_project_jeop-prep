import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <Link className="navigation__link" to="/ddd">
        <div className="navigation__ddd">{`Daily Daily-Double`}</div>
      </Link>
      <Link className="navigation__link" to="/df">
        <div className="navigation__df">{`Daily Final Jeopardy`}</div>
      </Link>
    </div>
  );
};

export default Navigation;
