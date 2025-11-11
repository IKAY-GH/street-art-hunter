import { Link } from "react-router-dom";

interface StartButtonProps {
  to: string;
  src: string;
  alt: string;
}

function StartButton({ to, src, alt }: StartButtonProps) {
  return (
    <Link to={to}>
      <img src={src} alt={alt} />
    </Link>
  );
}

export default StartButton;
