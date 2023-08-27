"use client"
import { useState, useContext } from 'react';
import { useSpring, animated } from '@react-spring/web'
import { BackgroundContext, ScreenPositionContext } from './context';
import Item from './components/item';
import Screen from './components/screen';
import { MAIN_SCREEN_SIZE } from './constants';

export default function Home() {
  const [initialBackground, setInitialBackground] = useState('#111111');
  const [initialColor, setInitialColor] = useState('#FFFFFF');

  const [background, api] = useSpring(() => ({
    from: {
      backgroundColor: initialBackground,
      color: initialColor,
    },
  }))

  const [screenPosition, screenPositionApi] = useSpring(() => ({
    from: { x: "0vw" },
  }))

  return (
    <BackgroundContext.Provider value={{ initialBackground, setInitialBackground, background, api, initialColor, setInitialColor }}>
      <ScreenPositionContext.Provider value={{ screenPosition, screenPositionApi }}>
        <Body />
      </ScreenPositionContext.Provider>
    </BackgroundContext.Provider>

  )
}

const Body = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [currentScreenKey, setCurrentScreenKey] = useState(null);
  const { background, setInitialBackground, setInitialColor } = useContext(BackgroundContext);
  const { screenPosition, screenPositionApi } = useContext(ScreenPositionContext);

  const nextScreen = ({ screenKey, newBg, newColor }) => {
    const nextScreen = currentScreen + 1;

    screenPositionApi.start({
      x: `${MAIN_SCREEN_SIZE * nextScreen}vw`
    })

    console.log(MAIN_SCREEN_SIZE)
    setCurrentScreen(nextScreen);

    if (screenKey) {
      setCurrentScreenKey(screenKey)
    }

    if (newBg) {
      setInitialBackground(newBg)
    }

    if (newColor) {
      setInitialColor(newColor);
    }

  }

  const previousScreen = ({ newBg, newColor }) => {
    const previousScreen = currentScreen - 1;

    screenPositionApi.start({
      x: `${MAIN_SCREEN_SIZE * previousScreen}vw`
    })

    setCurrentScreen(previousScreen);

    if (newBg) {
      setInitialBackground(newBg)
    }

    if (newColor) {
      setInitialColor(newColor);
    }

  }

  const stateMap = {
    1: {
      'Hello': <>
        <Item textColor={'#111111'} backgroundColor="#FFDC00" onClick={() => {
          nextScreen({ newColor: '#111111', newBg: '#FFDC00' })
        }}>Hello</Item>
        <h2 style={{ fontSize: '50px' }}>Currently based in Copenhagen, Denmark.
          Interested in understanding real-world challenges and using bleeding edge technology to solve them.
        </h2>
        <Item onClick={() => previousScreen({ newBg: 'black' })}>{"> Back"}</Item></>,
      'Orange': <>
        <h2 style={{ fontSize: '50px' }}>
          Sample orange screen.
        </h2>
        <Item onClick={() => previousScreen({ newBg: 'black' })}>{"> Back"}</Item>
      </>
    },
    2: {
      'Hello': <>
        <Item textBlack backgroundColor="#FFDC00" onClick={nextScreen}>You got here?</Item>
        <Item onClick={() => previousScreen({ newBg: 'black', newColor: 'white' })}>{"> Back"}</Item>
      </>
    },
    3: {
      'Hello': <>
        <Item textBlack backgroundColor="#FFDC00" onClick={nextScreen}>Another one!</Item>
        <Item onClick={() => previousScreen({ newBg: 'black' })}>{"> Back"}</Item>
      </>
    }
  }

  return <animated.main style={{ position: 'relative', height: '100vh', ...background }}>
    <Screen index={0}>
      <Item backgroundColor="#0074D9" onClick={() => {
        nextScreen({ screenKey: 'Hello', newBg: null })
      }}>Hello</Item>
      <Item backgroundColor="#FF851B" onClick={() => {
        nextScreen({ screenKey: 'Orange', newBg: '#FF851B' })
      }}>Orange</Item>
    </Screen>
    <Screen index={1}>
      {stateMap[1][currentScreenKey]}
    </Screen>
    <Screen index={2}>
      {stateMap[2][currentScreenKey]}
    </Screen>
    <Screen index={3}>
      {stateMap[3][currentScreenKey]}
    </Screen>
    <div style={{ position: 'absolute', height: '100%', right: 0, width: '20%', cursor: 'pointer' }} onClick={() => previousScreen({ newBg: 'black' })}>{currentScreenKey}</div>
  </animated.main >
}
