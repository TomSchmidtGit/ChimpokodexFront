import React, { useState, useEffect } from 'react';
import { Button } from '../../atoms';
import { Table, EditForm, CreateForm } from '../../molecules';

const ChimpokodexTable = () => {
    const [data, setData] = useState([]);
    const [selectedChimpokodex, setSelectedChimpokodex] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

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

    const handleCreate = async (chimpokomonData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8000/api/chimpokodex', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chimpokomonData),
            });

            if (!response.ok) throw new Error('Erreur lors de la création du Chimpokodex');
            alert('Chimpokomon créé avec succès');
            fetchChimpokodexData();
            setIsCreating(false);
        } catch (error) {
            console.error('Erreur lors de la création:', error);
        }
    };

    const handleEditChimpokodex = (chimpokodex) => {
        setSelectedChimpokodex(chimpokodex);
        fetchChimpokodexData();
    };

    const handleEditSubmit = async (event) => {
        console.log("EditSubmit launched");

        const updatedPvMax = parseInt(event.pvMax, 10);

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
                    name: event.name,
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
            fetchChimpokodexData();
            setData(prevData => data.filter(item => item.id !== chimpokodex.id));
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
        }
    };

    return (
        <div>
            {!isCreating && !selectedChimpokodex && (
                <>
                    <Button onClick={() => setIsCreating(true)} text="Créer un Chimpokomon" />
                    <Table data={data} onEdit={handleEditChimpokodex} onDelete={handleDeleteChimpokodex} />
                </>
            )}
            {isCreating && (
                <CreateForm
                    onCreate={handleCreate}
                    onCancel={() => setIsCreating(false)}
                />
            )}
            {selectedChimpokodex && (
                <EditForm
                    selectedChimpokodex={selectedChimpokodex}
                    onUpdate={handleEditSubmit}
                    onCancel={() => setSelectedChimpokodex(null)}
                />
            )}
        </div>
    );
};

export default ChimpokodexTable;
