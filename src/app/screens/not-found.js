import Item, { BackItem } from "../components/item";

const NotFound = () => {
  return (
    <>
      <Item
        textColor="#111111"
        backgroundColor="#FFDC00"
        nextScreenProps={{
          newColor: "#111111",
          newBg: "#FFDC00",
        }}
      >
        ¯\_(ツ)_/¯
      </Item>
      <h2 style={{ fontSize: "50px" }}>
        This page is still under construction.
      </h2>
      <BackItem />
    </>
  );
};

export default NotFound;
