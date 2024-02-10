import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartAIDS = ({ data }) => {

    return (
        <LineChart
            width={1150}
            height={500}
            data={data}
            margin={{ top: 100, right: 10, left: 50, bottom: 5 }}
        >
            <CartesianGrid />
            <XAxis dataKey="ano" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default LineChartAIDS;