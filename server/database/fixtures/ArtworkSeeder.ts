import AbstractSeeder from "./AbstractSeeder";

import ArtistSeeder from "./ArtistSeeder";

const artworksData = [
  {
    title: "La chasse aux Moot Moot",
    description:
      "Sticker/street art de la créature “Moot Moot” de El Moot Moot, visible dans les rues toulousaines le long de la Garonne.",
    image_url:
      "https://tse1.mm.bing.net/th/id/OIP.wkUQGw5wRO4W1e0-3AyDLQHaE8?pid=Api",
    latitude: 43.6,
    longitude: 1.4333,
    points: 100,
    artist_refName: "el_moot_moot",
    refName: "la_chasse_aux_moot_moot",
  },
  {
    title: "Ah que Coucou",
    description: "Johnny Halliday",
    image_url:
      "https://tse1.mm.bing.net/th/id/OIP.wkUQGw5wRO4W1e0-3AyDLQHaE8?pid=Api",
    latitude: 43.6,
    longitude: 1.4333,
    points: 100,
    artist_refName: "johnny_halliday",
    refName: "ah_que_coucou",
  },
  {
    title: "Hakuna matata",
    description: "Il était une fois dans la savane.",
    image_url:
      "https://tse1.mm.bing.net/th/id/OIP.wkUQGw5wRO4W1e0-3AyDLQHaE8?pid=Api",
    latitude: 43.6,
    longitude: 1.4333,
    points: 100,
    artist_refName: "Simba",
    refName: "hakuna_matata",
  },
];

class ArtworkSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "artwork", truncate: true, dependencies: [ArtistSeeder] });
  }

  run() {
    for (const element of artworksData) {
      const { artist_refName, ...artworkData } = element;
      const artwork = {
        ...artworkData,
        artist_id: this.getRef(element.artist_refName).insertId,
      };
      this.insert(artwork);
    }
  }
}

export default ArtworkSeeder;
