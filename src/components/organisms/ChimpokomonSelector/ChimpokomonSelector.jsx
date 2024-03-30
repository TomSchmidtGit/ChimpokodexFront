import React, { useState, useEffect } from "react";
import { Button, Paragraph } from "../../atoms";
import TeamDisplay from "../../organisms/TeamDisplay/TeamDisplay";
import styled from "styled-components";

const ChimpokomonSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.background};
  color: ${(props) => (props.color ? props.color : props.theme.primary)};
  padding: 20px;
  margin-top: 60px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  th, td {
    border: 1px solid ${props => props.theme.primary};
    padding: 8px;
    text-align: left;
  }
`;

const ChimpokomonSelector = () => {
  const [chimpokomons, setChimpokomons] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showTeam, setShowTeam] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/chimpokodex', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((data) => setChimpokomons(data))
    .catch((error) => console.error(error));
  }, []);

  const handleToggle = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else if (selectedIds.length < 6) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleTeamDisplayToggle = () => {
    setShowTeam(!showTeam);
  };

  return (
    <ChimpokomonSelectorContainer>
      <Button text={showTeam ? "Changer la composition" : "Voir mon équipe"} onClick={handleTeamDisplayToggle} />
      <Paragraph> Les équipes sont limités à 6 Chimpokomon </Paragraph>
      {!showTeam && (
        <StyledTable>
          <thead>
            <tr>
              <th>Choix</th>
              <th>Nom</th>
              <th>PV Max</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(chimpokomons) && chimpokomons.map((chimpokomon) => (
              <tr key={chimpokomon.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(chimpokomon.id)}
                    onChange={() => handleToggle(chimpokomon.id)}
                  />
                </td>
                <td>{chimpokomon.name}</td>
                <td>{chimpokomon.pvMax}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
      {showTeam && (
        <TeamDisplay chimpokomons={chimpokomons.filter((chimp) => selectedIds.includes(chimp.id))} />
      )}
    </ChimpokomonSelectorContainer>
  );
};

export default ChimpokomonSelector;
