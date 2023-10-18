import React, { useState, useEffect } from 'react';
import { Slider, Button, TextField } from '@mui/material';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

import '../style/Terapia.css';
import '../style/Terapia.css';

const CalibrationStage = () => {
    const [value, setValue] = useState(1);
    const [duration, setDuration] = useState(1);
    const [graphData, setGraphData] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    const [therapyStarted, setTherapyStarted] = useState(false);
    const [paused, setPaused] = useState(false);

    const maxIntensity = 20;
    console.log(graphData);
    useEffect(() => {
        const data = [];
        const transitionTime = 10; // Tiempo en segundos para la transición de 1 a 20
        const transitionSteps = (duration * 60) / transitionTime;
        const stepsToMax = (duration * 60) * 0.8;

        for (let i = 0; i < duration * 60; i++) {
            let currentIntensity = value;
            if (i < stepsToMax) {
                if (value < maxIntensity) {
                    currentIntensity = (i / transitionSteps) * (maxIntensity - value) + value;
                }
            } else {
                currentIntensity = maxIntensity;
            }
            data.push({
                time: i / (duration * 60),
                intensity: currentIntensity < 0 ? 0 : currentIntensity, // Asegurarse de que no haya valores negativos
            });
        }

        const firstSlopeData = data.slice(0, stepsToMax);
        const secondSlopeData = data.slice(stepsToMax);

        setGraphData([firstSlopeData, secondSlopeData]);
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
        setPaused(true);
        setShowResults(true);
        setResults({
            ...results,
            percentage: percentageProgress,
        });
    };

    const resumeTherapy = () => {
        setPaused(false);
    };

    const finishTherapy = () => {
        setGraphData([]);
        setResults(null);
        setShowResults(false);
        setTherapyStarted(false);
        setPaused(false);
        setCurrentIndex(0);
        setValue(1);
        setDuration(1);
    };

    const timeAssigned = (duration * 60) * 0.8;
    const timeAssignedData = new Array(timeAssigned).fill(value);

    const timeRemaining = (duration * 60) * 0.2;
    const timeRemainingData = new Array(timeRemaining).fill(20);

    const data = [...timeAssignedData, ...timeRemainingData];

    const labels = new Array(duration * 60).fill(null).map((_, index) => index / 60);

    const chartData = labels.map((label, index) => ({
        time: label,
        current: data[index],
    }));

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout;
        if (!paused && currentIndex < chartData.length - 1) {
            timeout = setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
            }, 1000);
        }
    
        return () => clearTimeout(timeout);
    }, [paused, currentIndex, chartData]);

    const currentData = chartData.slice(0, currentIndex + 1);

    const timeElapsed = (currentIndex + 1) / 60;
    const intensityInProgress = currentData[currentIndex].current;

    const percentageProgress = Math.min(((currentIndex + 1) / (chartData.length - 1)) * 100, 100);


    return (
        <div className="calibration-stage">
            <div className="container">
                <div className="left-container">
                    <h2>Etapa de calibración</h2>
                    <p className="slider-value"><strong>Mostrar valor:</strong> {value} <strong>mA</strong></p>
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
                        <div className="resultados">
                            <p><strong>Intensidad de aplicación:</strong> {value} <strong>mA</strong></p>
                            <p><strong>Tiempo de la sesión:</strong> {duration} <strong>min</strong></p>
                        </div>
                        <div className="resultados">
                            <p><strong>Intensidad en el transcurso:</strong> {intensityInProgress.toFixed(1)} <strong>mA</strong></p>
                            <p><strong>Tiempo transcurrido:</strong> {timeElapsed.toFixed(1)} <strong>min</strong></p>
                        </div>
                        <p><strong>Estado de la terapia:</strong> {percentageProgress.toFixed(2)} <strong>%</strong></p>
                        <div className="button_result_container">
                            {paused ? (
                                <Button onClick={resumeTherapy} disabled={!therapyStarted}>
                                    Reanudar terapia
                                </Button>
                            ) : (
                                <Button onClick={stopTherapy} disabled={!therapyStarted}>
                                    Detener terapia
                                </Button>
                            )}
                            <Button className="finish-button" onClick={finishTherapy} disabled={!therapyStarted}>
                                Finalizar terapia
                            </Button>
                        </div>
                    </div>
                )}

            </div>
            {showResults && (
                <div className="graphis_container">
                    <XYPlot width={800} height={280} xDomain={[0, currentData.length]} yDomain={[0, 20]}>
                        <LineSeries
                            data={currentData.map((dataPoint, index) => ({
                                x: index,
                                y: dataPoint.current,
                            }))}
                            style={{
                                strokeWidth: 2,
                                fill: 'none', // No rellena el área debajo de la línea
                            }}
                        />
                        <XAxis title="Tiempo (min)" />
                        <YAxis title="Corriente (mA)" tickValues={[0, 1, 5, 10, 15, 20]} />
                    </XYPlot>
                </div>
            )}
        </div>
    );
};

export default CalibrationStage;
