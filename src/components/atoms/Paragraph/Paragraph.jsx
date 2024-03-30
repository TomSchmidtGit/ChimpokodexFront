import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.div`
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
  padding: 20px;
  margin: 10px 0;
`;

const Paragraph = ({ children }) => {
  return <StyledParagraph>{children}</StyledParagraph>;
};

export default Paragraph;
