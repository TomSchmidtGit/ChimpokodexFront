import React from 'react';
import { Button } from '../../atoms';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  th, td {
    border: 1px solid ${props => props.theme.primary};
    padding: 8px;
    text-align: left;
  }
`;
const TableCell = ({ children }) => <td>{children}</td>;

const TableRow = ({ chimpokodex, onEdit, onDelete }) => {
    return (
        <tr>
            <TableCell>{chimpokodex.id}</TableCell>
            <TableCell>{chimpokodex.name}</TableCell>
            <TableCell>{chimpokodex.pvMax}</TableCell>
            <TableCell>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    onEdit(chimpokodex);
                }}text = "Modifier"></Button>
            </TableCell>
            <TableCell><Button onClick={() => onDelete(chimpokodex)} text="Supprimer"></Button></TableCell>
        </tr>
    );
};

const Table = ({ data, onEdit, onDelete }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nom</th>
                    <th>PV Max</th>
                    <th>Modification</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
                {data.map((chimpokodex) => (
                    <TableRow key={chimpokodex.id} chimpokodex={chimpokodex} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </StyledTable>
    );
};

export default Table;
