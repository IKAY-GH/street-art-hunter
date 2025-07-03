import AbstractSeeder from "./AbstractSeeder";

const dat = [
  {
    name: "Banksi",
    country: "US of A",
    refName: "banksi",
  },
];

class ArtistSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "artist", truncate: true });
  }

  async run() {
    for (const element of dat) {
      this.insert(element);
    }
  }
}

export default ArtistSeeder;
