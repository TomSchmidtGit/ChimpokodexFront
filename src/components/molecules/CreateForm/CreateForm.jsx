import React, { useState } from 'react';
import { InputText, Button } from '../../atoms';

const CreateChimpokomonForm = ({ onCancel, onCreate }) => {
    const [name, setName] = useState('');
    const [pvMax, setPvMax] = useState('');
    const [evolutionId, setEvolutionId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name.length < 5) {
            alert("Le nom doit contenir au moins 5 caractères.");
            return;
        }

        if (!name || !pvMax || !evolutionId) {
            alert('Le nom, les PV Max et l\'ID d\'évolution sont obligatoires.');
            return;
        }

        const chimpokomonData = {
            name,
            pvMax: parseInt(pvMax, 10),
            evolutionId: parseInt(evolutionId, 10),
        };

        onCreate(chimpokomonData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputText
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={5}
                placeholder="Nom"
                required
            />
            <InputText
                type="text"
                value={pvMax}
                onChange={(e) => setPvMax(e.target.value)}
                placeholder="PV Max"
                required
            />
            <InputText
                type="text"
                value={evolutionId}
                onChange={(e) => setEvolutionId(e.target.value)}
                placeholder="ID de l'évolution"
                required
            />
            <Button type="submit" text="Valider" />
            <Button onClick={onCancel} text="Annuler" />
        </form>
    );
};

export default CreateChimpokomonForm;
