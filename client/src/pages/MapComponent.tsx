import { useState } from "react";
import ArtworkList from "../components/ArtworkList";
import LocationInput from "../components/LocationInput";
import "./MapComponent.css";

export default function Carte() {
  const [userLatitude, setUserLatitude] = useState<number | null>(null);
  const [userLongitude, setUserLongitude] = useState<number | null>(null);

  const handlePosition = (lat: number, lng: number) => {
    setUserLatitude(lat);
    setUserLongitude(lng);
  };

  return (
    <main className="carte-container">
      <h1 className="carte-title">Les œuvres à proximité</h1>

      {/* SECTION CENTRALE : CARTE + LISTE */}
      <div className="carte-content">
        {/* LISTE DES ŒUVRES (EXEMPLE EN DUR) */}
        <div className="artwork-list">
          <div className="artwork-card">
            <img
              src="https://www.street-art-toulouse.com/wp-content/uploads/2020/12/100taur-creature-scaled.jpg"
              alt="Street Art 100Taur"
              className="artwork-image"
            />
            <div className="artwork-info">
              <div className="artwork-title">Street Art 100Taur</div>
              <div className="artwork-address">19-5 Rue des Anges</div>
              <div className="artwork-rating">⭐ 4.2 (5)</div>
              <a
                className="artwork-maplink"
                href="https://www.google.com/maps/place/19-5+Rue+des+Anges,+Toulouse/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>

          <div className="artwork-card">
            <img
              src="https://www.ixiart.com/images/works/ixi-oeuvre.jpg"
              alt="IXIart Gallery"
              className="artwork-image"
            />
            <div className="artwork-info">
              <div className="artwork-title">IXIart Gallery</div>
              <div className="artwork-address">12 Port Saint-Sauveur</div>
              <div className="artwork-rating">⭐ 4.8 (19)</div>
              <a
                className="artwork-maplink"
                href="https://www.google.com/maps/place/12+Port+Saint-Sauveur,+Toulouse/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>
        </div>
        {/* CARTE INTERACTIVE */}
        <div className="map-wrapper">
          <iframe
            title="Carte Toulouse"
            width="100%"
            height="350"
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=..."
            allowFullScreen
          />
        </div>
      </div>

      {/* GÉOLOCALISATION */}
      <LocationInput onPositionFound={handlePosition} />

      {/* LISTE DYNAMIQUE SI COORDONNÉES RÉELLES */}
      {userLatitude !== null && userLongitude !== null && (
        <ArtworkList
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />
      )}
    </main>
  );
}
