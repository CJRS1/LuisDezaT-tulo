import React, { useState, useEffect } from 'react';
import { Slider, Button, TextField, Alert } from '@mui/material';

import TherapyChart from './TherapyChart'

import '../style/Terapia.css';

const CalibrationStage = () => {
    const [value, setValue] = useState(1);
    const [duration, setDuration] = useState(1);
    const [graphData, setGraphData] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    const [therapyStarted, setTherapyStarted] = useState(false);

    useEffect(() => {
        // Generar datos de la gráfica
        const data = [];
        for (let i = 0; i < duration * 60; i++) {
            if (i < duration * 60 * 0.8) {
                data.push({
                    time: i / (duration * 60),
                    intensity: value,
                });
            } else {
                data.push({
                    time: i / (duration * 60),
                    intensity: 20,
                });
            }
        }
        setGraphData(data);
    }, [duration, value]);

    const showError = () => {
        if (value === 0 || duration === 0) {
            alert('Error: Los valores no pueden ser 0');
        }
    };

    const startTherapy = () => {
        alert('Por favor colóquese la máscara')
        if (value === 0 || duration === 0) {
            showError();
            return;
        }

        setShowResults(false);

        setResults({
            intensity: value,
            time: duration,
            percentage: 0,
        });

        setShowResults(true);

        setTherapyStarted(true);
    };

    const stopTherapy = () => {
        setShowResults(true);

        setResults({
            ...results,
            percentage: 50,
        });
    };

    const finishTherapy = () => {
        setGraphData([]);
        setResults(null);
        setShowResults(false);

        setTherapyStarted(false);
    };

    return (
        <div className="calibration-stage">
            <div className="container">
                <div className="left-container">
                    <h2>Etapa de calibración</h2>
                    <p className="slider-value">Mostrar valor (mA): {value}</p>
                    <Slider
                        value={value}
                        onChange={(event, newValue) => setValue(newValue)}
                        className="slider"
                        step={1}
                        marks={[
                            { value: 1, label: '1 mA' },
                            { value: 3, label: '3 mA' },
                            { value: 8, label: '8 mA' },
                            { value: 20, label: '20 mA' },
                        ]}
                        max={20}
                    />
                    <TextField
                        className="duration-input"
                        label="Duración de terapia (min)"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        min={1}
                        max={20}
                    />
                    <Button
                        className="start-button"
                        disabled={value === 0 || duration === 0 || therapyStarted}
                        onClick={startTherapy}
                    >
                        Iniciar terapia
                    </Button>
                </div>

                {showResults && (
                    <div className="right-container">
                        <h2>Resultados</h2>
                        <p>Intensidad de aplicación: {results?.intensity} mA</p>
                        <p>Tiempo de la sesión: {results?.time} min</p>
                        <p>Estado de la terapia: {results?.percentage} %</p>
                        <div className="button_result_container">
                            <Button onClick={stopTherapy} disabled={!therapyStarted}>
                                Detener terapia
                            </Button>
                            <Button className="finish-button" onClick={finishTherapy} disabled={!therapyStarted}>
                                Finalizar terapia
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            {showResults && (
                <TherapyChart value={value} duration={duration} />
            )}
        </div>
    );
};

export default CalibrationStage;
