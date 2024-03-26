import React, { useState, useEffect } from 'react';

const TableCell = ({ children }) => <td>{children}</td>;

const TableRow = ({ chimpokodex, onEdit, onDelete }) => {
    return (
        <tr>
            <TableCell>{chimpokodex.id}</TableCell>
            <TableCell>{chimpokodex.name}</TableCell>
            <TableCell>{chimpokodex.pvMax}</TableCell>
            <TableCell>
                <button onClick={(e) => {
                    e.stopPropagation();
                    onEdit(chimpokodex);
                }}>Modifier</button>
                <button onClick={() => onDelete(chimpokodex)}>Supprimer</button>
            </TableCell>
        </tr>
    );
};


const ChimpokodexTable = () => {
    const [data, setData] = useState([]);
    const [selectedChimpokodex, setSelectedChimpokodex] = useState(null);

    const fetchChimpokodexData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8000/api/chimpokodex', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Erreur lors de la récupération des données');
            const newData = await response.json();
            setData(newData);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchChimpokodexData();
    }, []);

    const handleEditChimpokodex = (chimpokodex) => {
        setSelectedChimpokodex(chimpokodex);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        const updatedPvMax = parseInt(selectedChimpokodex.pvMax, 10);

        if (isNaN(updatedPvMax)) {
            alert('PV Max doit être un nombre valide.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8000/api/chimpokodex/${selectedChimpokodex.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: selectedChimpokodex.name,
                    pvMax: updatedPvMax,
                })
            });
            if (!response.ok) throw new Error('Erreur lors de la mise à jour');
            alert('Chimpokodex mis à jour avec succès!');
            setSelectedChimpokodex(null);
            fetchChimpokodexData();
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
        }
    };

    const handleDeleteChimpokodex = async (chimpokodex) => {
        const token = localStorage.getItem('token');
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce Chimpokodex ?");
        if (!confirmation) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/chimpokodex/${chimpokodex.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ forcedelete: false })
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression du Chimpokodex');

            alert('Chimpokodex supprimé avec succès');
            setData(prevData => prevData.filter(item => item.id !== chimpokodex.id));
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };

    return (
        <>
            <table>
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
                        <TableRow key={chimpokodex.id} chimpokodex={chimpokodex} onEdit={handleEditChimpokodex} onDelete={handleDeleteChimpokodex} />
                    ))}
                </tbody>
            </table>
            {selectedChimpokodex && (
                <form onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        value={selectedChimpokodex.name}
                        onChange={(e) => setSelectedChimpokodex({ ...selectedChimpokodex, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={selectedChimpokodex.pvMax}
                        onChange={(e) => setSelectedChimpokodex({ ...selectedChimpokodex, pvMax: e.target.value })}
                    />
                    <button type="submit">Valider les modifications</button>
                </form>
            )}
        </>
    );
};

export default ChimpokodexTable;
