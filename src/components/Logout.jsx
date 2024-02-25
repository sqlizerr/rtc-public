import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.removeItem('chat-app-user');
        navigate("/login");
    }
  return (
    <Button onClick={handleClick}>
        <h3>LOGOUT</h3>
    </Button>
  )
}

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    color: white;
    cursor: pointer;
    
`;
