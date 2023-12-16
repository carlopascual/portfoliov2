import Home from "./home";
import About from "./about";
import Experience from "./experience";
import NotFound from "./not-found";

export default {
  Home: Home,
  About: About,
  Experience: Experience,
  getScreen: function (screen) {
    return this[screen] || NotFound;
  },
};
