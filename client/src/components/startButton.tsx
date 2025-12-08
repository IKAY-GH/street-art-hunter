import { Link } from "react-router-dom";
import "./startButton.css";

// Props for StartButton component
interface StartButtonProps {
  to: string; // Route destination
  src: string; // Image source path
  alt: string; // Alt text for accessibility
}

/**
 * Reusable start button component with image
 * Renders as a React Router Link for client-side navigation
 */
function StartButton({ to, src, alt }: StartButtonProps) {
  return (
    <Link to={to} className="start-button-link">
      <img src={src} alt={alt} />
    </Link>
  );
}

export default StartButton;
