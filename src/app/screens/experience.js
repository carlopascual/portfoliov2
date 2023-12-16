import Item, { BackItem, NextItem } from "../components/item";
import Header from "../components/header";

const Experience = ({ nextScreen }) => {
  return (
    <>
      <Header>Experience</Header>
      <NextItem style={{ fontSize: "8vw" }}>Unity Technologies</NextItem>
      <NextItem backgroundColor="#000032">Trustpilot</NextItem>
      <NextItem>Feats</NextItem>
      <NextItem backgroundColor="rgb(242, 125, 0)">Quadric</NextItem>
      <NextItem backgroundColor="#C74634">Oracle</NextItem>
      <NextItem backgroundColor="#00aeef">FactSet</NextItem>
      <BackItem />
    </>
  );
};

export default Experience;
