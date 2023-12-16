import Item, { NextItem } from "../components/item";
import Header from "../components/header";

const Home = ({ nextScreen }) => {
  return (
    <>
      <Header backgroundColor="#0074D9">Carlo Pascual</Header>
      <NextItem>About</NextItem>
      <NextItem>Experience</NextItem>
      <NextItem
        backgroundColor="#333"
        nextScreenProps={{
          newBg: "#333",
        }}
      >
        Github
      </NextItem>
      <NextItem
        backgroundColor="#FF0000"
        nextScreenProps={{
          newBg: "#FF0000",
        }}
      >
        Youtube
      </NextItem>
      <NextItem
        backgroundColor="#0077B5"
        nextScreenProps={{ newBg: "#0077B5" }}
      >
        LinkedIn
      </NextItem>
    </>
  );
};

export default Home;
