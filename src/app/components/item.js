import styled from "styled-components";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { BackgroundContext, ScreenPositionContext } from "../context";

const Text = styled.h1`
  font-size: 12vw;
  font-weight: 600;
  display: flex;
  cursor: pointer;
  width: fit-content;

  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(1.07) translateX(5%) translateY(2%);
  }
`;

const Item = ({
  style,
  textColor,
  backgroundColor,
  onClick,
  onMouseLeave,
  children,
}) => {
  const { initialBackground, initialColor, api } =
    useContext(BackgroundContext);

  return (
    <Text
      as={animated.h1}
      onMouseEnter={() => {
        api.start({
          backgroundColor: backgroundColor,
          ...(textColor && { color: textColor }),
        });
      }}
      onMouseLeave={() => {
        api.start({ backgroundColor: initialBackground, color: initialColor });
      }}
      onClick={onClick}
      style={{ ...style }}
    >
      {children}
    </Text>
  );
};

export const NextItem = ({ children, nextScreenProps, ...props }) => {
  const { nextScreen } = useContext(ScreenPositionContext);

  return (
    <Item
      onClick={() => nextScreen({ screenKey: children, ...nextScreenProps })}
      {...props}
    >
      {children}
    </Item>
  );
};

export const BackItem = ({ previousScreenProps, ...props }) => {
  const { previousScreen } = useContext(ScreenPositionContext);

  return (
    <Item
      style={{ fontSize: "10vw" }}
      onClick={() => previousScreen({ newBg: "black", previousScreenProps })}
      {...props}
    >
      {"> Back"}
    </Item>
  );
};

export default Item;
