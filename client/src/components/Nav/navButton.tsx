import { Link } from "react-router-dom";
import "./navButton.css";

interface NavButtonProps {
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
}

function NavButton({
  ariaLabel,
  className = "nav-button",
  children,
  to,
  onClick,
  disabled = false,
}: NavButtonProps): React.ReactElement {
  if (to) {
    return (
      <Link
        to={to}
        aria-label={ariaLabel}
        className={className}
        aria-disabled={disabled}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default NavButton;
