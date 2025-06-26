// src/components/ArtworkList.tsx

import type { Artwork } from "../data/mockArtworks"; // Type uniquement
import { mockArtworks } from "../data/mockArtworks"; // Données simulées
import ArtworkCard from "./ArtworkCard"; // Composant carte d’œuvre
import "./ArtworkList.css"; // CSS associé

type Props = {
  userLatitude: number;
  userLongitude: number;
};

function getDistanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Rayon Terre km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function ArtworkList({ userLatitude, userLongitude }: Props) {
  const nearbyArtworks = mockArtworks.filter((artwork: Artwork) => {
    const distance = getDistanceInKm(
      userLatitude,
      userLongitude,
      artwork.latitude,
      artwork.longitude,
    );
    return distance <= 1;
  });

  return (
    <div className="artwork-list">
      {nearbyArtworks.length === 0 && <p>Aucune œuvre à proximité.</p>}

      {nearbyArtworks.map((artwork: Artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
