// src/pages/Map.tsx
import { useState } from "react"; // Hook useState
import ArtworkList from "../components/ArtworkList"; // Liste filtrée d’œuvres
import LocationInput from "../components/LocationInput"; // Composant GPS/saisie

// Page principale
export default function Carte() {
  // Position de l'utilisateur, par défaut null
  const [userLatitude, setUserLatitude] = useState<number | null>(null);
  const [userLongitude, setUserLongitude] = useState<number | null>(null);

  // Fonction appelée quand la position est trouvée (via LocationInput)
  const handlePosition = (lat: number, lng: number) => {
    setUserLatitude(lat);
    setUserLongitude(lng);
  };

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Carte des œuvres</h1>

      {/* Composant qui gère GPS ou saisie */}
      <LocationInput onPositionFound={handlePosition} />

      {/* Si on a une position, on affiche la liste des œuvres proches */}
      {userLatitude !== null && userLongitude !== null && (
        <ArtworkList
          userLatitude={userLatitude}
          userLongitude={userLongitude}
        />
      )}
    </main>
  );
}
