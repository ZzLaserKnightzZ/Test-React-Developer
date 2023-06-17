import styled from "styled-components";
import { HomePageContainer } from "./HomePage.styeld";

export const ShapePageContainer = styled(HomePageContainer)``;

export const ShapeWraper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  padding: 10%;
`;

export const ShapePageLayoutAndStyle = styled.div`
  position: fixed;
  top: 3rem;
  left: 3rem;

  font-size: 3rem;
`;

export const ShapeControlPosition = styled.div`
  width: 100%;
  height: 20%;

  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 10px;
`;

export const ShapeControlSubItem = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ShapeControlSub = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ShapeControlItem = styled.div`
  background-color: white;
  border-radius: 10px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: orange;
  }
  &:active {
    background-color: lime;
  }
`;

export const ShapeControlTitle = styled.div`
  background-color: lime;
  border-radius: 10px;
  height: 20px;
  width: 150px;
  font-size: 14px;
  color: white;

  position: absolute;
  top: calc(100% - 10px);
  left: calc(50% - 75px);
  //center text
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

export const ShapeSignLeft = styled.div`
  width: 100px;
  height: 100px;
  background-color: gray;

  clip-path: polygon(100% 0%, 100% 100%, 0% 50%);
`;

export const ShapeSignRight = styled(ShapeSignLeft)`
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
`;

export const ShapeSignUp = styled(ShapeSignLeft)`
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
`;

export const ShapeSignDown = styled(ShapeSignLeft)`
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
`;

export const ShapeItemsContainer = styled.div<{ row1: string; row2: string }>`
  width: 100%;
  height: 50%;

  display: grid;
  grid-template-areas: ${({ row1, row2 }) => `"${row1}" "${row2}"`};
  gap: 20px;
  transition: all 1;
`;

export const ShapeItem = styled.div<{ area: string }>`
  border-radius: 10px;
  background-color: white;
  box-sizing: border-box;
  grid-area: ${({ area }) => area || "c1r1"};
`;

export const ShapeItemWraper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;

  &:hover {
    background-color: orange;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PathImg = styled.div<{ clipPath: string }>`
  width: 100%;
  height: 100%;
  background-color: gray;
  box-sizing: border-box;
  clip-path: ${({ clipPath }) => clipPath};
`;
