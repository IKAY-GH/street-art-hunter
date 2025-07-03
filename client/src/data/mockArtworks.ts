// src/data/mockArtworks.ts (simulation d'une Api )

export interface Artwork {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  artist: string;
  address: string;
  rating: number;
  votes: number;
}

export const mockArtworks: Artwork[] = [
  {
    id: 1,
    title: "IXIart Gallery",
    description: "Galerie d’art en plein centre de Toulouse.",
    imageUrl: "https://via.placeholder.com/150",
    latitude: 43.6026,
    longitude: 1.4432,
    artist: "Galerie d’art",
    address: "12 Port Saint-Sauveur",
    rating: 4.8,
    votes: 19,
  },
  {
    id: 2,
    title: "Street Art 100Taur",
    description: "Oeuvre murale de l’artiste 100Taur.",
    imageUrl: "https://via.placeholder.com/150",
    latitude: 43.604,
    longitude: 1.451,
    artist: "100Taur",
    address: "19-5 Rue des Anges",
    rating: 4.2,
    votes: 5,
  },
];
