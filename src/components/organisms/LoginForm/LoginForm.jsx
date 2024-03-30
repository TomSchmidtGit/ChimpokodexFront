import React, { useState } from 'react';
import { InputText, Button } from "../../atoms";
import styled from 'styled-components';

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.theme.background};
  color: ${(props) => (props.color ? props.color : props.theme.primary)};
  padding: 20px;
  border-radius: 8px;
`;

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8000/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('refresh_token', data.refresh_token);
                onLoginSuccess();
            } else {
                console.error('Échec de la connexion');
                alert('Échec de la connexion : Identifiants invalides');
                setUsername('');
                setPassword('');
            }
        } catch (error) {
            console.error('Erreur de connexion', error);
            alert('Erreur de connexion : Impossible de joindre le serveur');
        }
    };
    

    return (
        <StyledLoginForm onSubmit={handleSubmit}>
            <InputText
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur"
            />
            <InputText
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
            />
            <Button text="Connexion" type="submit"></Button>
        </StyledLoginForm>
    );
};

export default LoginForm;
