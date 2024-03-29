import React from 'react';
import { Button } from '../../atoms';
import styled from 'styled-components';

const StyledTable = styled.table`
color: ${(props) => (props.color ? props.color : props.theme.primary)}
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
                <Button onClick={() => onDelete(chimpokodex)} text="Supprimer"></Button>
            </TableCell>
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
                    <th>Actions</th>
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
