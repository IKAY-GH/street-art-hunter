import AbstractSeeder from "./AbstractSeeder";
import UserSeeder from "./UserSeeder";

const scoreData = [
  {
    user_id: "user_0",
    total_points: "100",
  },
  {
    user_id: "user_1",
    total_points: "200",
  },
  {
    user_id: "user_2",
    total_points: "300",
  },
];

class ScoreSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "score", truncate: true, dependencies: [UserSeeder] });
  }

  run() {
    for (const element of scoreData) {
      const score = {
        ...element,
        user_id: this.getRef(element.user_id).insertId,
      };
      this.insert(score);
    }
  }
}

export default ScoreSeeder;
