import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
    nombre_dia: string;
    cantidad_cortes: number;
}

interface DataProps {
    chartData: ChartDataPoint[];
}

const BarChartDayWeek: React.FC<DataProps> = ({ chartData }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                width={500}
                height={400}
                data={chartData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre_dia" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="cantidad_cortes"
                    stroke="#8884d8"
                    name="Cantidad de Cortes"
                    fill="#8884d8"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default BarChartDayWeek;
