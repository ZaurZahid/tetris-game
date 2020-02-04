import styled from "styled-components";

export const StyledDisplay = styled.div `
 box-sizing: border-box ;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  width: 100%;
  min-height: 30px;
  border-radius: 20px;
  color: ${props => (props.gameOver ? "red" : "white")};
  font-family:Pixel Arial ;
  background:#000;
  font-size:0,8rem
`;