"use client";
import { useState, useContext } from "react";
import { useSpring, animated } from "@react-spring/web";
import { BackgroundContext, ScreenPositionContext } from "./context";
import Item from "./components/item";
import Screen from "./components/screen";
import { MAIN_SCREEN_SIZE } from "./constants";
import StyledComponentsRegistry from "./lib/registry";
import componentMap from "./screens";

export default function Home() {
  const [initialBackground, setInitialBackground] = useState("#111111");
  const [initialColor, setInitialColor] = useState("#FFFFFF");
  const [screenKeys, setScreenKeys] = useState(["Home"]);

  const [background, api] = useSpring(() => ({
    from: {
      backgroundColor: initialBackground,
      color: initialColor,
    },
  }));

  const [screenPosition, screenPositionApi] = useSpring(() => ({
    from: { x: "0vw" },
  }));

  const nextScreen = ({ screenKey, newBg, newColor }) => {
    screenPositionApi.start({
      x: `${MAIN_SCREEN_SIZE * screenKeys.length}vw`,
    });

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
    screenPositionApi.start({
      x: `${MAIN_SCREEN_SIZE * (screenKeys.length - 2)}vw`,
      onRest: () => {
        setScreenKeys((prevKeys) => prevKeys.slice(0, -1));
      },
    });

    if (newBg) {
      setInitialBackground(newBg);
    }

    if (newColor) {
      setInitialColor(newColor);
    }
  };

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
        value={{
          screenPosition,
          screenPositionApi,
          nextScreen,
          previousScreen,
        }}
      >
        <StyledComponentsRegistry>
          <animated.main
            style={{
              position: "relative",
              overflow: "scroll",
              overflowX: "hidden",
              height: "100vh",
              ...background,
            }}
          >
            {screenKeys.map((value, index) => {
              const Component = componentMap[value];

              return (
                <Screen key={index} index={index}>
                  <Component {...{ nextScreen, previousScreen }} />
                </Screen>
              );
            })}
            <div
              style={{
                position: "fixed",
                height: "100%",
                right: 0,
                width: "20%",
                cursor: "pointer",
              }}
              onClick={() =>
                screenKeys.length > 1 && previousScreen({ newBg: "black" })
              }
            />
          </animated.main>
        </StyledComponentsRegistry>
      </ScreenPositionContext.Provider>
    </BackgroundContext.Provider>
  );
}
