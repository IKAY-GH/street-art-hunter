import AbstractSeeder from "./AbstractSeeder";

import ArtworkSeeder from "./ArtworkSeeder";
import UserSeeder from "./UserSeeder";

const discovered_artworksData = [
  {
    user_id: "user_0",
    artwork_id: "la_chasse_aux_moot_moot",
  },
  {
    user_id: "user_1",
    artwork_id: "ah_que_coucou",
  },
  {
    user_id: "user_2",
    artwork_id: "hakuna_matata",
  },
];

class DiscoveredArtworksSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "discovered_artwork",
      truncate: true,
      dependencies: [ArtworkSeeder, UserSeeder],
    });
  }

  run() {
    for (const element of discovered_artworksData) {
      const discovered_artwork = {
        artwork_id: this.getRef(element.artwork_id).insertId,
        user_id: this.getRef(element.user_id).insertId,
      };
      this.insert(discovered_artwork);
    }
  }
}

export default DiscoveredArtworksSeeder;
