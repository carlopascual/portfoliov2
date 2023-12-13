"use client";
import { useState, useContext } from "react";
import { useSpring, animated } from "@react-spring/web";
import { BackgroundContext, ScreenPositionContext } from "./context";
import Item from "./components/item";
import Screen from "./components/screen";
import { MAIN_SCREEN_SIZE } from "./constants";
import StyledComponentsRegistry from "./lib/registry";

export default function Home() {
  const [initialBackground, setInitialBackground] = useState("#111111");
  const [initialColor, setInitialColor] = useState("#FFFFFF");

  const [background, api] = useSpring(() => ({
    from: {
      backgroundColor: initialBackground,
      color: initialColor,
    },
  }));

  const [screenPosition, screenPositionApi] = useSpring(() => ({
    from: { x: "0vw" },
  }));

  return (
    <BackgroundContext.Provider
      value={{
        initialBackground,
        setInitialBackground,
        background,
        api,
        initialColor,
        setInitialColor,
      }}
    >
      <ScreenPositionContext.Provider
        value={{ screenPosition, screenPositionApi }}
      >
        <StyledComponentsRegistry>
          <Body />
        </StyledComponentsRegistry>
      </ScreenPositionContext.Provider>
    </BackgroundContext.Provider>
  );
}

const Body = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [screenKeys, setScreenKeys] = useState([null]);

  const { background, setInitialBackground, setInitialColor } =
    useContext(BackgroundContext);
  const { screenPosition, screenPositionApi } = useContext(
    ScreenPositionContext
  );

  const nextScreen = ({ screenKey, newBg, newColor }) => {
    const nextScreen = currentScreen + 1;

    screenPositionApi.start({
      x: `${MAIN_SCREEN_SIZE * nextScreen}vw`,
    });

    setCurrentScreen(nextScreen);

    if (screenKey) {
      // push into screen keys
      setScreenKeys([...screenKeys, screenKey]);
    }

    if (newBg) {
      setInitialBackground(newBg);
    }

    if (newColor) {
      setInitialColor(newColor);
    }
  };

  const previousScreen = ({ newBg, newColor }) => {
    const previousScreen = currentScreen - 1;

    screenPositionApi.start({
      x: `${MAIN_SCREEN_SIZE * previousScreen}vw`,
      onRest: (a, b, c) => {
        setScreenKeys((prevKeys) => {
          console.log("Previous keys:", prevKeys);
          const newKeys = prevKeys.slice(0, -1);
          console.log("New keys:", newKeys);
          return newKeys;
        });
      },
    });

    setCurrentScreen(previousScreen);

    if (newBg) {
      setInitialBackground(newBg);
    }

    if (newColor) {
      setInitialColor(newColor);
    }
  };

  const BackItem = () => (
    <Item
      style={{ fontSize: "10vw" }}
      onClick={() => previousScreen({ newBg: "black" })}
    >
      {"> Back"}
    </Item>
  );

  const stateMap = {
    0: {
      [null]: (
        <>
          <Item
            backgroundColor="#0074D9"
            style={{ fontSize: "8vw" }}
            onClick={() => {
              // nextScreen({ screenKey: 'Hello', newBg: null })
            }}
          >
            Carlo Pascual
          </Item>
          <Item
            onClick={() => {
              nextScreen({ screenKey: "Hello" });
            }}
          >
            About
          </Item>
          <Item
            onClick={() => {
              nextScreen({ screenKey: "Experience" });
            }}
          >
            Experience
          </Item>
          <Item
            backgroundColor="#333"
            onClick={() => {
              nextScreen({ screenKey: "Orange", newBg: "#333" });
            }}
          >
            Github
          </Item>
          <Item
            backgroundColor="#FF0000"
            onClick={() => {
              nextScreen({ screenKey: "Orange", newBg: "#FF0000" });
            }}
          >
            Youtube
          </Item>
          <Item
            backgroundColor="#0077B5"
            onClick={() => {
              nextScreen({ screenKey: "Orange", newBg: "#0077B5" });
            }}
          >
            LinkedIn
          </Item>
        </>
      ),
    },
    1: {
      Hello: (
        <>
          <Item
            textColor={"#111111"}
            backgroundColor="#FFDC00"
            onClick={() => {
              nextScreen({ newColor: "#111111", newBg: "#FFDC00" });
            }}
          >
            Hello!
          </Item>
          <h2 style={{ fontSize: "50px" }}>
            Currently based in Copenhagen, Denmark. Interested in understanding
            real-world challenges and using bleeding edge technology to solve
            them.
          </h2>
          <BackItem />
        </>
      ),
      Orange: (
        <>
          <h2 style={{ fontSize: "50px" }}>Sample screen.</h2>
          <BackItem />
        </>
      ),
      Experience: (
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
        </>
      ),
    },
    2: {
      Hello: (
        <>
          <Item textBlack backgroundColor="#FFDC00" onClick={nextScreen}>
            and welcome!
          </Item>
          <Item
            onClick={() =>
              previousScreen({ newBg: "black", newColor: "white" })
            }
          >
            {"> Back"}
          </Item>
        </>
      ),
    },
    3: {
      Hello: (
        <>
          <Item textBlack backgroundColor="#FFDC00" onClick={nextScreen}>
            Another one!
          </Item>
          <BackItem />
        </>
      ),
    },
  };

  return (
    <animated.main
      style={{
        position: "relative",
        overflow: "scroll",
        overflowX: "hidden",
        height: "100vh",
        ...background,
      }}
    >
      {Object.keys(stateMap).map((value, index) => (
        <Screen key={index} index={index}>
          {stateMap[index][screenKeys[index]]}
          {index}
        </Screen>
      ))}
      <div
        style={{
          position: "fixed",
          height: "100%",
          right: 0,
          width: "20%",
          cursor: "pointer",
        }}
        onClick={() =>
          currentScreen !== 0 && previousScreen({ newBg: "black" })
        }
      />
    </animated.main>
  );
};
