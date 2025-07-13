import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../assets/MapComponent.css"; // Assure-toi que ce fichier CSS est bien là

// Icône personnalisée pour le marqueur
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export default function MapComponent() {
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setError(null);
          setLoading(false);
        },
        () => {
          setError("Impossible d'obtenir votre position.");
          setLoading(false);
        },
      );
    } else {
      setError("La géolocalisation n'est pas supportée.");
    }
  };

  return (
    <div className="map-page">
      <button
        type="button"
        onClick={handleGeolocation}
        className="location-button"
      >
        📍 Me géolocaliser
      </button>

      {loading && <p>Recherche de votre position...</p>}
      {error && <p className="error-message">{error}</p>}

      <MapContainer
        center={currentPosition || [43.604, 1.444]} // Toulouse par défaut
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%", marginTop: "1rem" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {currentPosition && (
          <Marker position={currentPosition} icon={defaultIcon}>
            <Popup>Vous êtes ici 📍</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
