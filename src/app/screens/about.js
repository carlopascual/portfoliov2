import Item from "../components/item";

const About = () => {
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
        Hello!
      </Item>
      <h2 style={{ fontSize: "50px" }}>
        Currently based in Copenhagen, Denmark. Interested in understanding
        real-world challenges and using bleeding edge technology to solve them.
      </h2>
    </>
  );
};

export default About;
