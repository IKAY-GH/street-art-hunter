// src/pages/Carte.tsx
import { useState } from "react";
import ArtworkList from "../components/ArtworkList";
import LocationInput from "../components/LocationInput";
import "./Carte.css";

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

      {/* Carte affichée en permanence */}
      <div className="map-container">
        <iframe
          title="Carte Toulouse"
          width="100%"
          height="350"
          frameBorder="0"
          src="https://www.google.com/maps/place/Toulouse/@43.6006736,1.3502699,12z/data=!3m1!4b1!4m6!3m5!1s0x12aebb6fec7552ff:0x406f69c2f411030!8m2!3d43.6048462!4d1.442848!16zL20vMGNiaGg?entry=ttu&g_ep=EgoyMDI1MDYyOS4wIKXMDSoASAFQAw%3D%3D"
          allowFullScreen
        />
      </div>

      <LocationInput onPositionFound={handlePosition} />

      {userLatitude !== null && userLongitude !== null && (
        <ArtworkList
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />
      )}
    </main>
  );
}
