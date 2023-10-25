// Login.js
import React, { useState } from 'react';
// Importa el archivo SCSS en tu componente
import { TextField } from '@mui/material';
import '../style/Login.css';

import imagen1 from '../assets/image.jpg'
// import imagen2 from '../assets/estetica.webp'
import imagen3 from '../assets/portadas.jpg'


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
            {registering ? (

                <div className="registration-form">
                    <div className="registration_form_card">
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
                    <img src={imagen3} alt="" />
                </div>
            ) : (

                <div className="login-form">
                    <img src={imagen1} alt="" />
                    <div className="login_form_card">
                        <h2><strong>¡Bienvenido!</strong></h2>
                        <h2>"Sistema de Terapia Facial por Estimulación Eléctrica</h2>
                        <TextField
                            className="iniciar_sesion"
                            label="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            className="iniciar_sesion"
                            type="password"
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="button_container">

                            <button onClick={handleLogin}>Ingresar</button>
                            <button onClick={handleRegister}>Registrarse</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
