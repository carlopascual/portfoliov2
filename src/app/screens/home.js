import Item, { NextItem } from "../components/item";

const Home = ({ nextScreen }) => {
  return (
    <>
      <Item backgroundColor="#0074D9" style={{ fontSize: "8vw" }}>
        Carlo Pascual
      </Item>
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
