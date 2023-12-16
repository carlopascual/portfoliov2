import Home from "./home";
import About from "./about";
import Experience from "./experience";
import ExperienceUnity from "./experience-unity";
import NotFound from "./not-found";

export default {
  Home: Home,
  About: About,
  Experience: Experience,
  "Unity Technologies": ExperienceUnity,
  getScreen: function (screen) {
    return this[screen] || NotFound;
  },
};
