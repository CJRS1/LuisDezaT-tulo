// Login.js
import React, { useState } from 'react';
// Importa el archivo SCSS en tu componente
import {TextField } from '@mui/material';
import '../style/Login.css';


const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [newPassword2, setnewPassword2] = useState('');
    const [registering, setRegistering] = useState(false);
    const [fullName, setFullName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    console.log(loggedIn);
    
    const handleLogin = () => {
        if (username === 'LuisDeza' && password === '123456') {
            alert('Inicio de sesión exitoso');
            setLoggedIn(true);
            onLoginSuccess();
        } else {
            alert('Credenciales incorrectas');
        }
    };

    const handleRegister = () => {
        setRegistering(true);
    };

    const handleRegistrationSubmit = () => {
        // Aquí puedes guardar los datos de registro en tu "base de datos" interna
        alert('Registro exitoso');
        setRegistering(false);
    };

    return (
        <div className="login-container">
            <h1>Bienvenido a Terapia Facial</h1>
            {registering ? (
                <div className="registration-form">
                    <h2>Registro</h2>
                    <TextField
                        className="iniciar_sesion"
                        label="Usuario"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        className="iniciar_sesion"
                        label="DNI"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                    />
                    <TextField
                        className="iniciar_sesion"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className="iniciar_sesion"
                        label="Contraseña"
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                    />
                    <TextField
                        className="iniciar_sesion"
                        label="Confirmar Contraseña"
                        value={newPassword2}
                        onChange={(e) => setnewPassword2(e.target.value)}
                    />

                    <button onClick={handleRegistrationSubmit}>Registrarse</button>
                </div>
            ) : (
                <div className="login-form">
                    <h2>Iniciar Sesión</h2>
                    {/* <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /> */}
                    <TextField
                        className="iniciar_sesion"
                        label="Usuario"
                        value={username}
                        onChange={(e) =>  setUsername(e.target.value)}
                    />
                    {/* <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /> */}
                    <TextField
                        className="iniciar_sesion"
                        type="password"
                        label="Contraseña"
                        value={password}
                        onChange={(e) =>  setPassword(e.target.value)}
                    />
                    <div className="button_container">

                        <button onClick={handleLogin}>Ingresar</button>
                        <button onClick={handleRegister}>Registrarse</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
