import styled from 'styled-components';
import { animated } from '@react-spring/web';
import { useContext } from 'react';
import { ScreenPositionContext } from '../context';
import { MAIN_SCREEN_SIZE } from '../constants'

const ScreenComponent = styled.div`
    position: absolute;
    width: ${MAIN_SCREEN_SIZE}vw;
    height: 100vh;
`;

const Screen = ({ index, children }) => {
    const { screenPosition } = useContext(ScreenPositionContext);

    return <ScreenComponent as={animated.div} style={{ left: `-${MAIN_SCREEN_SIZE * index}vw`, ...screenPosition }}>
        {children}
    </ScreenComponent>
}


export default Screen;