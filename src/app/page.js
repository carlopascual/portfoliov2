"use client"
import { useState } from 'react';
import { useSpring, animated } from '@react-spring/web'

export default function Home() {
  const [initialText, setInitialText] = useState('hihihi');
  const [springs, api] = useSpring(() => ({
    from: { x: -200 },
  }))

  const [bg, bgApi] = useSpring(() => ({
    from: {
      backgroundColor: 'black'
    },

  }))

  const handleClick = ({ text, bg }) => {
    setInitialText(text);

    api.start({
      x: 0
    })

    bgApi.start({
      backgroundColor: bg
    })
  }

  const onMouseLeave = () => {
    bgApi.start({
      backgroundColor: 'black'
    })
  }

  return (
    <animated.main style={{ display: 'flex', position: 'relative', ...bg }} >
      <animated.div
        style={{
          width: '200px',
          border: '1px solid blue',
          ...springs
        }}
      >
        <h1>{initialText}</h1>
        <h1 onClick={() => {
          api.start({ x: -200 })
        }}>{"> back"}</h1>
      </animated.div>
      <animated.div style={{ border: '1px solid red', height: '100vh', ...springs }}>
        <h1
          onClick={() => { handleClick({ text: 'HIHIHI', bg: 'purple' }) }}
          onMouseEnter={() => {
            bgApi.start({ backgroundColor: 'purple' })
          }}
          onMouseLeave={onMouseLeave}
        >
          hello
        </h1>
        <h1
          onClick={() => { handleClick({ text: 'HUHUHU', bg: 'blue' }) }}
          onMouseEnter={() => {
            bgApi.start({ backgroundColor: 'blue' })
          }}
          onMouseLeave={onMouseLeave}
        >
          goodbye
        </h1>

      </animated.div>
      <div>
      </div>
    </animated.main >
  )
}
