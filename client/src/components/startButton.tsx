import { Link } from "react-router-dom";
import "./startButton.css";

interface StartButtonProps {
  to: string;
  src: string;
  alt: string;
}

function StartButton({ to, src, alt }: StartButtonProps) {
  return (
    <Link to={to} className="start-button-link">
      <img src={src} alt={alt} />
    </Link>
  );
}

export default StartButton;
