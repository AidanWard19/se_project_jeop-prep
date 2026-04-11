import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__text">
        <div>Developed by Aidan Ward</div>
        <a
          className="footer__github-link"
          href="https://github.com/AidanWard19"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <div>2024</div>
      </div>
    </footer>
  );
}

export default Footer;
