import Item, { BackItem } from "../components/item";

const Home = ({ nextScreen }) => {
  return (
    <>
      <Item style={{ fontSize: "8vw" }}>Experience</Item>
      <Item style={{ fontSize: "8vw" }} onClick={nextScreen}>
        Unity Technologies
      </Item>
      <Item backgroundColor="#000032" onClick={nextScreen}>
        Trustpilot
      </Item>
      <Item onClick={nextScreen}>Feats</Item>
      <Item backgroundColor="rgb(242, 125, 0)" onClick={nextScreen}>
        Quadric
      </Item>
      <Item backgroundColor="#C74634" onClick={nextScreen}>
        Oracle
      </Item>
      <Item backgroundColor="#00aeef" onClick={nextScreen}>
        FactSet
      </Item>
      <BackItem />
    </>
  );
};

export default Home;
