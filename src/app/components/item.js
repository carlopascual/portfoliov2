import styled from 'styled-components';
import { animated } from '@react-spring/web';
import { useContext } from 'react'
import { BackgroundContext } from '../context';

const Text = styled.h1`
  font-size: 20vw;
  font-weight: 600;
  display: flex;

  &:hover {
    cursor: pointer;
  }
`

const Item = ({ textColor, springApi, backgroundColor, onClick, onMouseLeave, children }) => {
  const { initialBackground, initialColor, api } = useContext(BackgroundContext);

  return (
    <Text
      as={animated.h1}
      onMouseEnter={() => {
        api.start({ backgroundColor: backgroundColor, ...(textColor && { color: textColor }) })
      }}
      onMouseLeave={() => {
        api.start({ backgroundColor: initialBackground, color: initialColor })
      }}
      onClick={onClick}
    >
      {children}
    </Text>
  )
}

export default Item;