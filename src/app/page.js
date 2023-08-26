"use client"
import { useState, useContext } from 'react';
import { useSpring, animated } from '@react-spring/web'
import { BackgroundContext } from './context';
import Item from './components/item';

export default function Home() {
  const [initialBackground, setInitialBackground] = useState('#111111');

  const [background, api] = useSpring(() => ({
    from: {
      backgroundColor: initialBackground
    },
  }))

  return (
    <BackgroundContext.Provider value={{ initialBackground, setInitialBackground, background, api }}>
      <Body />
    </BackgroundContext.Provider>

  )
}

const Body = () => {
  const { background, setInitialBackground } = useContext(BackgroundContext);

  const [springs, api] = useSpring(() => ({
    from: { x: "-80vw" },
  }))

  const handleClick = ({ newBg }) => {
    api.start({
      x: "0vw"
    })

    if (newBg) {
      setInitialBackground(newBg)
    }
  }

  const handleBackClick = ({ newBg }) => {
    api.start({
      x: "-80vw",
    })

    if (newBg) {
      setInitialBackground(newBg)
    }
  }

  return <animated.main style={{ position: 'relative', height: '100vh', ...background }} >
    <animated.div style={{ width: '80vw', height: '100vh', position: 'absolute', ...springs }}>
      <Item textBlack backgroundColor="#FFDC00" onClick={handleClick}>Hello</Item>
      <h2 style={{ fontSize: '50px' }}>Currently based in Copenhagen, Denmark.

        Interested in understanding real-world challenges and using bleeding edge technology to solve them.
      </h2>
      <Item onClick={() => handleBackClick({ newBg: 'black' })}>{"> Back"}</Item>
    </animated.div>
    <animated.div style={{ width: '80vw', height: '100vh', position: 'absolute', left: '80vw', ...springs }}>
      <Item backgroundColor="#0074D9" onClick={handleClick}>Hello</Item>
      <Item backgroundColor="#FF851B" onClick={() => handleClick({ newBg: '#FF851B' })}>Orange</Item>
    </animated.div>
  </animated.main >
}
