import art from "../assets/icon/art.png";
import hunt from "../assets/icon/hunt.png";
import reporting from "../assets/icon/reporting.png";
import statistics from "../assets/icon/statistics.png";
import users from "../assets/icon/users.png";

const tabsData = [
  {
    tabTitle: "Statistiques",
    id: 1,
    icon: statistics,
    contain: [],
  },
  {
    tabTitle: "Utilisateurs",
    id: 2,
    icon: users,
    contain: [],
  },
  {
    tabTitle: "Oeuvres/Artistes",
    id: 3,
    icon: art,
    contain: [],
  },
  {
    tabTitle: "Chasse",
    id: 4,
    icon: hunt,
    contain: [],
  },
  {
    tabTitle: "Signalement",
    id: 5,
    icon: reporting,
    contain: [],
  },
];

export default tabsData;
