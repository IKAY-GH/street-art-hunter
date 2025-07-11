// src/components/ArtworkCard.tsx

import type { Artwork } from "../data/mockArtworks"; // Import du type Artwork défini dans le mock

// Définition du type des props attendues : ici, une œuvre de type Artwork
type Props = {
  artwork: Artwork;
};

// Composant fonctionnel qui reçoit une œuvre et l'affiche sous forme de carte
export default function ArtworkCard({ artwork }: Props) {
  return (
    <div className="artwork-card">
      {/* Image de l’œuvre */}
      <img
        src={artwork.imageUrl}
        alt={artwork.title}
        className="artwork-image"
      />

      {/* Titre et artiste */}
      <div className="artwork-info">
        <h3>{artwork.title}</h3>
        <p>
          <strong>{artwork.artist}</strong> · {artwork.address}
        </p>

        {/* Note avec étoiles et nombre d'avis */}
        <p>
          ⭐ {artwork.rating.toFixed(1)} ({artwork.votes} avis)
        </p>

        {/* Lien vers Google Maps avec les coordonnées (simulé ici) */}
        <a
          href={`https://www.google.com/maps?q=${artwork.latitude},${artwork.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="map-link"
        >
          Voir sur Google Maps
        </a>
      </div>
    </div>
  );
}
