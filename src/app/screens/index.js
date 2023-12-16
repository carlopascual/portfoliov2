import Home from "./home";
import About from "./about";
import NotFound from "./not-found";

export default {
  Home: Home,
  About: About,
  getScreen: function (screen) {
    return this[screen] || NotFound;
  },
};
