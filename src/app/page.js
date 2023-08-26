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
    from: { x: -700 },
  }))

  const handleClick = ({ newBg }) => {
    api.start({
      x: 0
    })

    if (newBg) {
      setInitialBackground(newBg)
    }
  }

  const handleBackClick = ({ newBg }) => {
    api.start({
      x: -700,
    })

    if (newBg) {
      setInitialBackground(newBg)
    }
  }

  return <animated.main style={{ display: 'flex', position: 'relative', height: '100vh', ...background }} >
    <animated.div style={{ width: '700px', ...springs }}>
      <Item textBlack backgroundColor="#FFDC00" onClick={handleClick}>Hello</Item>
      <h2 style={{ fontSize: '50px' }}>Currently based in Copenhagen, Denmark.

        Interested in understanding real-world challenges and using bleeding edge technology to solve them.
      </h2>
      <Item onClick={() => handleBackClick({ newBg: 'black' })}>{"> Back"}</Item>
    </animated.div>
    <animated.div style={{ width: '800px', ...springs }}>
      <Item backgroundColor="#0074D9" onClick={handleClick}>Hello</Item>
      <Item backgroundColor="#FF851B" onClick={() => handleClick({ newBg: '#FF851B' })}>Orange</Item>
    </animated.div>
  </animated.main >
}
