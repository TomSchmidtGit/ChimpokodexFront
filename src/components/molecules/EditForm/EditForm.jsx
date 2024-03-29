import React, { useState } from 'react';
import { Button, InputText } from '../../atoms';

const EditForm = ({ selectedChimpokodex, onUpdate, onCancel }) => {
    const [name, setName] = useState(selectedChimpokodex.name);
    const [pvMax, setPvMax] = useState(selectedChimpokodex.pvMax);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (name.length < 5) {
            alert("Le nom doit contenir au moins 5 caractères.");
            return;
        }

        const updatedChimpokodex = {
            ...selectedChimpokodex,
            name: name,
            pvMax: pvMax,
        };
    
        onUpdate(updatedChimpokodex);
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputText
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={5}
            />
            <InputText
                type="text"
                value={pvMax}
                onChange={(e) => setPvMax(e.target.value)}
            />
            <Button type="submit" text="Valider" />
            <Button onClick={onCancel} text="Annuler" />
        </form>
    );
};

export default EditForm;
