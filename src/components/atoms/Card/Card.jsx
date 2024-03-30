import React from "react";
import styled from "styled-components";

const CardStyle = styled.div`
  background-color: ${(props) => props.theme.secondary ?? "white"};
  color: ${(props) => props.theme.primary ?? "white"};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  ${(props) =>
    props.isItemSelected
      ? `
        position: fixed;
        top: 0;
        left: 0;
        height: 60px;
      `
      : `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `}  
`;

const Card = (props) => {
  return <CardStyle {...props}></CardStyle>;
};

export default Card;