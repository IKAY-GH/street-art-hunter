import L from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ArtworkList from "../components/ArtworkList";
import ChangeMapView from "../pages/ChangeMapView";
import "../assets/styles/page-layout.css";
import "./MapComponent.css";

// Custom Leaflet marker icon configuration
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Map component with geolocation and nearby artworks display
export default function MapComponent() {
  // User's current GPS position
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);

  // Error and loading states
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNearbyArtworks, setShowNearbyArtworks] = useState(false);

  // Request browser geolocation to get user's GPS coordinates
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        // Success callback - update position state
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setError(null);
          setLoading(false);
        },
        // Error callback - geolocation failed
        () => {
          setError("Impossible d'obtenir votre position.");
          setLoading(false);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée.");
    }
  };

  // Display nearby artworks if position is available
  const handleShowNearby = () => {
    if (currentPosition) {
      setShowNearbyArtworks(true);
    } else {
      setError("Géolocalisez-vous d'abord.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <h1 className="page-title">Les œuvres à proximité</h1>

        <div className="map-section">
          <div className="map-container">
            <MapContainer
              // Default to Toulouse coordinates if no position yet
              center={currentPosition || [43.604, 1.444]}
              zoom={13}
              scrollWheelZoom={true}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {currentPosition && (
                <>
                  <ChangeMapView position={currentPosition} />
                  <Marker position={currentPosition} icon={defaultIcon}>
                    <Popup>Vous êtes ici 📍</Popup>
                  </Marker>
                </>
              )}
            </MapContainer>
          </div>

          <div className="map-buttons">
            <button
              type="button"
              onClick={handleGeolocation}
              className="button"
            >
              📍 Me géolocaliser
            </button>
            <button type="button" onClick={handleShowNearby} className="button">
              🎯 Œuvres à proximité
            </button>
          </div>

          {loading && (
            <p className="page-text">Recherche de votre position...</p>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>

        {showNearbyArtworks && currentPosition && (
          <div className="artwork-card-list">
            <ArtworkList
              userLatitude={currentPosition[0]}
              userLongitude={currentPosition[1]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
