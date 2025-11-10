import AbstractSeeder from "./AbstractSeeder";

const artistsData = [
  {
    name: "El moot moot",
    bio: "Une balade le long de la Garonne. Il y a plein de graffitis à découvrir, j'en ai sélectionné quelques-uns. Voici quelques murs d'El Moot Moot. Impossible de rater ses créatures si vous passez par Toulouse. Vous verrez ses stickers, j'en suis sûr ! Un artiste à découvrir.",
    profile_image_url:
      "https://media.streetartcities.com/f/f1d32263-069c-4c87-aabd-63cb84419d8a/orig.jpg",
    avatar_url:
      "https://www.artetcadres.com/wp-content/uploads/Meute-Jaune-29_32.png",
    refName: "el_moot_moot",
  },
  {
    name: "Johnny Halliday",
    bio: "Oh Marie si tu savais",
    profile_image_url:
      "https://media.streetartcities.com/f/f1d32263-069c-4c87-aabd-63cb84419d8a/orig.jpg",
    avatar_url:
      "https://www.artetcadres.com/wp-content/uploads/Meute-Jaune-29_32.png",
    refName: "johnny_halliday",
  },
  {
    name: "Simba",
    bio: "Le_roi_lion",
    profile_image_url:
      "https://media.streetartcities.com/f/f1d32263-069c-4c87-aabd-63cb84419d8a/orig.jpg",
    avatar_url:
      "https://www.artetcadres.com/wp-content/uploads/Meute-Jaune-29_32.png",
    refName: "Simba",
  },
];

class ArtistSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "artist", truncate: true });
  }

  async run() {
    for (const element of artistsData) {
      this.insert(element);
    }
  }
}

export default ArtistSeeder;
