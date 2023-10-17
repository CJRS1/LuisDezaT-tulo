import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Terapia from './components/Terapia';

function App() {
    const [terapiaStarted, setTerapiaStarted] = useState(false);

    const handleLoginSuccess = () => {
        setTerapiaStarted(true);
    }

    return (
        <div className="App">
            <header className="App-header">
                {terapiaStarted ? (
                    <Terapia />
                ) : (
                    <Login onLoginSuccess={handleLoginSuccess} />
                )}
            </header>
        </div>
    );
}

export default App;
