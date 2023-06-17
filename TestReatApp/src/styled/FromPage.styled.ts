import styled, { css } from "styled-components";
import { HomePageContainer } from "./HomePage.styeld";
import { Link } from "react-router-dom";

export const FormContainer = styled(HomePageContainer)``;

export const FormWraperContainer = styled.div`
  margin: 0;
  padding: 3%;
  width: 100%;
  height: auto;
  box-sizing: border-box;

  display: grid;
  grid-template-rows: auto auto;
  gap: 2rem;
`;

export const FormWrap = styled.div`
  padding: 2rem 15% 2rem 15%;
  width: 100%;
  box-sizing: border-box;

  @media only screen and (width < 1080px) {
    padding: 2rem 3% 2rem 3%;
  }
`;

export const From = styled.div`
  width: 100%;
  height: auto;
  border: 2px solid black;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 1rem;

  display: grid;
  grid-template-rows: repeat(14, minmax(2rem, auto));
  gap: 5px;

  & > * {
    min-width: 0px;
  }

  @media only screen and (width < 1080px) {
    padding: 2rem 3% 2rem 3%;
  }
`;

export const Row1 = styled.div`
  display: grid;
  grid-template-columns: 20% auto auto;
  gap: 10px;

  box-sizing: border-box;
  width: 100%;

  @media only screen and (width < 1080px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(3, 1rem + auto);
    border-bottom: 1px solid black;
  }
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 20% auto auto;
  gap: 10px;
  @media only screen and (width < 1080px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(2, 5rem);
    border-bottom: 1px solid black;
  }
`;

export const Row3 = styled.div`
  display: grid;
  grid-template-columns: 50%;
  gap: 10px;
  @media only screen and (width < 1080px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(2, 3rem);
    border-bottom: 1px solid black;
  }
`;

export const Row4 = styled.div`
  display: grid;
  grid-template-columns: 6% 10% 10% 10% auto;
  gap: 10px;
  border-bottom: 1px solid black;
`;

export const Row5 = styled.div`
  display: grid;
  grid-template-columns: 25% 20% auto;
  gap: 10px;
  @media only screen and (width < 1080px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(2, 5rem);
    border-bottom: 1px solid black;
  }
`;

export const Row6 = styled.div`
  display: grid;
  grid-template-columns: 27% auto;
  gap: 10px;
  @media only screen and (width < 1080px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(2, 3rem);
    border-bottom: 1px solid black;
  }
`;

export const Row7 = styled.div`
  display: grid;
  grid-template-columns: 27% auto auto;
  gap: 10px;
  @media only screen and (width < 1080px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(3, 4rem);
    border-bottom: 1px solid black;
  }
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 1rem;
  //center text
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export const Label = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  box-sizing: border-box;
  & > span::first-letter {
    color: red;
  }
`;

export const NormalRow = styled.div<{ maxWidthColumn: string | null }>`
  display: grid;
  grid-template-columns:
    minmax(1rem, ${({ maxWidthColumn }) => maxWidthColumn || "auto"})
    auto;
  gap: 7px;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;

  & > * {
    min-width: 0px;
  }
  @media only screen and (width < 1080px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(2, 2rem);
    & > ${Label} {
      text-align: center;
    }
  }
`;

export const SelectOption = styled.select`
  width: auto;
  border-radius: 5px;
  border: 1px solid black;

  font-size: 1.2rem;
  background-color: white;
  & > option {
    font-size: 1rem;
  }
`;

export const RadioButton = styled.input`
  border: 1px solid black;
  font-size: 1.2rem;
  &:checked {
    color: aqua;
  }
`;

export const InputText = styled.input<{ isValid: boolean }>`
  background-color: white;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  ${({ isValid }) =>
    isValid
      ? css``
      : css`
          outline: 1px solid red;
        `}
`;

export const TableWraper = styled.div`
  min-height: 200px;
  width: 100%;
`;

export const IdCardContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
`;

export const IdCardShowText = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: white;
  caret-color: transparent;
  color: black;
`;

export const IdCardInputText = styled(IdCardShowText)`
  caret-color: black;
  color: transparent;
  font-size: 1.5rem;
  background-color: transparent;
`;

export const Table = styled.table`
  width: 100%;
  height: 250px;
  background-color: white;

  display: grid;
  grid-template-rows: 3rem auto;

  border-radius: 10px;
`;

export const Thead = styled.thead`
  width: 100%;

  box-sizing: border-box;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const Tbody = styled.tbody`
  width: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const Th = styled.th`
  flex: 1 1 20%;
  text-align: left;
  font-size: clamp(1rem, 1.8vw, 1rem);

  padding: 15px;
  @media only screen and (width < 1140px) {
    font-size: clamp(0.7rem, 1.5vw, 1rem);
  }
`;

export const TrHearder = styled.tr`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const Tr = styled.tr`
  display: flex;
  width: 100%;
  height: 2.1rem;

  &:nth-of-type(odd) {
    background-color: pink;
  }
  &:nth-of-type(even) {
    background-color: red;
  }
`;

export const Td = styled.td`
  flex: 1 1 20%;
  text-align: left;
  padding: 7px;
  font-size: clamp(1rem, 1.9vw, 1.4rem);
  box-sizing: border-box;
  @media only screen and (width < 1140px) {
    font-size: clamp(0.7rem, 1.5vw, 1rem);
  }
`;

export const Separate = styled.span`
  float: right;
  & > * {
    color: gray;
  }
`;

export const SortSign = styled.div`
  display: grid;
  grid-template-rows: 0.5rem 0.5rem;
`;

export const SortSignContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const PaginationContainer = styled.div`
  width: 50%;
  height: 30px;
  display: grid;
  grid-template-columns: auto;
  background-color: red;
  border-radius: 10px;
  border: 1px solid gold;
`;
/*
export const PaginationShiftLeft = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  font-weight: bold;
  background-color: gray;
  user-select: none;
  font-size: 1.5rem;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const PaginationShiftRight = styled(PaginationShiftLeft)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
*/
export const PaginationSelecter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

export const PaginationItem = styled.div<{ isActive: boolean }>`
  user-select: none;
  width: 2rem;
  height: 100%;
  background-color: ${({ isActive }) => (isActive ? "lime" : "gray")};

  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`;

export const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
  background-color: white;

  &:hover {
    outline: 3px solid auto;
  }
`;

export const BackToHomePage = styled(Link)`
  position: fixed;
  top: 3rem;
  right: 3rem;

  text-decoration: none;
  color: black;
  background-color: white;
  border-radius: 5px;
  width: auto;
  height: 1.5rem;
  font-size: 1rem;

  //center text
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  &:visited {
    color: black;
  }
`;
