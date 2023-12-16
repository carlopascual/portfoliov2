"use client";
import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { BackgroundContext, ScreenPositionContext } from "./context";
import Screen from "./components/screen";
import { MAIN_SCREEN_SIZE } from "./constants";
import StyledComponentsRegistry from "./lib/registry";
import componentMap from "./screens";

const initialScreen = ["Home"];

export default function Home() {
  const [screenPointer, setScreenPointer] = useState(0);
  const [initialBackground, setInitialBackground] = useState("#111111");
  const [initialColor, setInitialColor] = useState("#FFFFFF");

  const [animationState, setAnimationState] = useState(false);
  const [screenKeys, setScreenKeys] = useState(initialScreen);

  const [background, api] = useSpring(() => ({
    from: {
      backgroundColor: initialBackground,
      color: initialColor,
    },
  }));

  const [screenPosition, screenPositionApi] = useSpring(() => ({
    from: { x: "0vw" },
  }));

  useEffect(() => {
    screenPositionApi.start({
      x: `${MAIN_SCREEN_SIZE * screenPointer}vw`,
      onRest: () => {
        if (animationState === "back")
          setScreenKeys((prev) => prev.slice(0, -1));

        setAnimationState(false);
      },
    });
  }, [screenPointer]);

  const nextScreen = ({ screenKey, newBg, newColor }) => {
    if (animationState) return;

    setScreenKeys((prev) => [...prev, screenKey]);
    setAnimationState("next");
    setScreenPointer((prev) => prev + 1);

    if (newBg) {
      setInitialBackground(newBg);
    }

    if (newColor) {
      setInitialColor(newColor);
    }
  };

  const previousScreen = ({ newBg, newColor }) => {
    if (animationState) return;

    if (screenPointer > 0) {
      setAnimationState("back");
      setScreenPointer((prev) => prev - 1);
    }

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
              const Component = componentMap.getScreen(value);

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
              onClick={() => previousScreen({ newBg: "black" })}
            >
              {animationState}
            </div>
          </animated.main>
        </StyledComponentsRegistry>
      </ScreenPositionContext.Provider>
    </BackgroundContext.Provider>
  );
}
