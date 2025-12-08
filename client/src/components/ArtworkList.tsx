import type { Artwork } from "../data/mockArtworks";
import { mockArtworks } from "../data/mockArtworks";
import ArtworkCard from "./ArtworkCard";

// Props for ArtworkList component
type Props = {
  userLatitude: number;
  userLongitude: number;
};

// Calculate distance between two GPS coordinates using Haversine formula
function getDistanceInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Earth radius in kilometers
  const R = 6371;
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

// Component to display artworks within 30km radius of user
export default function ArtworkList({ userLatitude, userLongitude }: Props) {
  // Filter artworks by distance (max 30km)
  const nearbyArtworks = mockArtworks.filter((artwork: Artwork) => {
    const distance = getDistanceInKm(
      userLatitude,
      userLongitude,
      artwork.latitude,
      artwork.longitude
    );
    return distance <= 30;
  });

  return (
    <div className="artwork-list">
      {nearbyArtworks.length === 0 && <p>Aucune oeuvre à proximité.</p>}
      {nearbyArtworks.map((artwork: Artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
