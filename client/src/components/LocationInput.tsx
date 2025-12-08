import { useState } from "react";

// Props for LocationInput component
type Props = {
  onPositionFound: (latitude: number, longitude: number) => void;
};

/**
 * Location input component - allows users to share their position
 * either via GPS geolocation or manual city entry
 */
export default function LocationInput({ onPositionFound }: Props) {
  const [city, setCity] = useState("");

  // Handle GPS geolocation using browser's native API
  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Géolocalisation non supportée");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onPositionFound(position.coords.latitude, position.coords.longitude);
      },
      () => {
        alert("Impossible de récupérer votre position.");
      }
    );
  };

  // Handle manual city input - currently only supports Toulouse
  const handleManualSubmit = () => {
    if (city.trim().toLowerCase() === "toulouse") {
      onPositionFound(43.6045, 1.4442);
    } else {
      alert("Seule la ville de Toulouse est supportée pour l’instant.");
    }
  };

  return (
    <div className="location-input">
      <button type="button" onClick={handleGeolocation}>
        📍 Me géolocaliser
      </button>

      <div className="manual-entry">
        <input
          type="text"
          placeholder="Entrer une ville (ex : Toulouse)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="button" onClick={handleManualSubmit}>
          Valider
        </button>
      </div>
    </div>
  );
}
