import { useNavigate } from "react-router-dom";

/**
 * Home button component with house icon
 * Navigates user to home page when clicked
 */
function HomeButton() {
  const navigate = useNavigate();

  // Navigate to home page on click
  function handleclick() {
    navigate("/");
  }
  return (
    <button onClick={handleclick} type="button" aria-label="Aller à l'accueil">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="2em"
        height="2em"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
      </svg>
    </button>
  );
}

export default HomeButton;
