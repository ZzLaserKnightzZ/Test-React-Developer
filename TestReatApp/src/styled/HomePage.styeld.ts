import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomePageContainer = styled.div`
  position: fixed;
  overflow-y: auto;
  width: 100vw;
  width: 100dvw;
  height: 100vh;
  height: 100dvh;
  background: linear-gradient(to left, #ffa200, #6eda78);
  box-sizing: border-box;
`;

export const HomePageWraper = styled.div`
  width: 100%;
  height: 100%;

  //center box
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  & > * {
    width: 20%;
    height: 10%;
    max-width: 300px;
    min-width: 15px;
  }

  @media only screen and (width < 500px) {
    flex-direction: column;
    & > * {
      width: 50%;
    }
  }
`;

export const HomePageBox = styled(Link)`
  background-color: white;
  text-decoration: none;
  padding: 20px;

  display: grid;
  grid-template-rows: 70% 30%;
`;

export const HomePageTitle = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 900;
`;

export const HomePageDescription = styled(HomePageTitle)`
  font-size: 14px;
  font-weight: 300;
`;

export const SelectLanguage = styled.select`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: auto;
  height: 2rem;
  border-radius: 5px;
  border: 1px solid black;

  font-size: 1.2rem;
  background-color: white;
  & > option {
    font-size: 1rem;
  }
`;
