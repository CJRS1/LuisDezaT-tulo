import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import '../style/Terapia.css';

const TherapyChart = ({ value, duration }) => {
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

    return (
        <div className="graphis_container">
            <LineChart width={800} height={280} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time"
                    label={{ value: 't(min)', position: 'insideBottom', offset: -10, angle: 0 }} />

                <YAxis
                    dataKey="current"
                    label={{ value: 'I(mA)', angle: -90, position: 'insideLeft', fontSize: 16 }}
                    tickFormatter={(value) => value.toFixed(1)}
                />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" dataKey="current" stroke="#32CD32 " strokeWidth={3} dot={false} />
            </LineChart>
        </div>
    );
};

export default TherapyChart;
