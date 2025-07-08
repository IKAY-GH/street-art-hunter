import AbstractSeeder from "./AbstractSeeder";

const userdata = [
  {
    email: "ikay@gmail.com",
    avatar_url:
      "https://www.parismatch.com/lmnr/f/webp/r/1440,960,FFFFFF,forcex,center-middle/img/var/pm/public/styles/paysage/public/media/image/2022/03/20/04/L-ecureuil-lutin-bien-aime.jpg?VersionId=40s1kBzScl_shy5.hmqEPRKyB5crqgU3",
    zip_code: "31000",
    last_name: "AY",
    first_name: "IK",
    password_hash: "Noisette31",
    refName: "user_0",
  },
  {
    email: "clement@gmail.com",
    avatar_url:
      "https://www.parismatch.com/lmnr/f/webp/r/1440,960,FFFFFF,forcex,center-middle/img/var/pm/public/styles/paysage/public/media/image/2022/03/20/04/L-ecureuil-lutin-bien-aime.jpg?VersionId=40s1kBzScl_shy5.hmqEPRKyB5crqgU3",
    zip_code: "31000",
    last_name: "Bachimont",
    first_name: "Clément",
    password_hash: "Noix31",
    refName: "user_1",
  },
  {
    email: "jerome@gmail.com",
    avatar_url:
      "https://www.parismatch.com/lmnr/f/webp/r/1440,960,FFFFFF,forcex,center-middle/img/var/pm/public/styles/paysage/public/media/image/2022/03/20/04/L-ecureuil-lutin-bien-aime.jpg?VersionId=40s1kBzScl_shy5.hmqEPRKyB5crqgU3",
    zip_code: "31000",
    last_name: "Wiera",
    first_name: "Jerome",
    password_hash: "Cacahuete31",
    refName: "user_2",
  },
];

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    for (const element of userdata) {
      this.insert(element);
    }
  }
}
export default UserSeeder;
