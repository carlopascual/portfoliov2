import styled from 'styled-components';
import { animated, useInView } from '@react-spring/web';
import { useContext } from 'react';
import { ScreenPositionContext } from '../context';
import { MAIN_SCREEN_SIZE } from '../constants'

const ScreenComponent = styled.div`
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    letter-spacing: -0.01vw;
    position: absolute;
    width: ${MAIN_SCREEN_SIZE}vw;
    height: 100vh;

    h2 {
        line-height: 80px;
    }
`;

const Screen = ({ index, children }) => {
    const { screenPosition } = useContext(ScreenPositionContext);
    const [ref, inView] = useInView()

    return <ScreenComponent ref={ref} as={animated.div} style={{ left: `-${MAIN_SCREEN_SIZE * index}vw`, ...screenPosition }}>
        {inView ? children : null}
    </ScreenComponent>
}


export default Screen;