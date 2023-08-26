import styled from 'styled-components';
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

const Item = ({ textBlack, springApi, backgroundColor, onClick, onMouseLeave, children }) => {
  const { initialBackground, api } = useContext(BackgroundContext);

  return (
    <Text
      as="animated.h1"
      onMouseEnter={() => {
        api.start({ backgroundColor: backgroundColor })
      }}
      onMouseLeave={() => {
        api.start({ backgroundColor: initialBackground })
      }}
      onClick={onClick}
    >
      {children}
    </Text>
  )
}

export default Item;