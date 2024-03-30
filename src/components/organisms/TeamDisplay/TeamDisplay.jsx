import React from "react";
import styled from "styled-components";

const TeamContainer = styled.div`
  color: ${({ theme }) => theme.primary};
`;

const StyledTable = styled.table`
  color: ${({ theme }) => theme.primary};
  border-collapse: collapse;
  width: 100%;
`;

const StyledTh = styled.th`
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  text-align: left;
  padding: 8px;
`;

const StyledTd = styled.td`
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  text-align: left;
  padding: 8px;
`;

const TeamDisplay = ({ chimpokomons }) => {
  return (
    <TeamContainer>
      <h2>Votre équipe</h2>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>Nom</StyledTh>
            <StyledTh>PV Max</StyledTh>
          </tr>
        </thead>
        <tbody>
          {chimpokomons.map((chimpokomon) => (
            <tr key={chimpokomon.id}>
              <StyledTd>{chimpokomon.name}</StyledTd>
              <StyledTd>{chimpokomon.pvMax}</StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TeamContainer>
  );
};

export default TeamDisplay;
