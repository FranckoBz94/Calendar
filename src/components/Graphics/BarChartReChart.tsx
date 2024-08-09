import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarberData {
  barber_id: number;
  nameBarber: string;
  lastNameBarber: string;
  year: number;
  month: number;
  total_turnos: number;
}

interface TransformedData {
  name: string;
  [key: string]: number | string;
}

interface DataProps {
  chartData: BarberData[];
  startDate: Date | null;
  endDate: Date | null;
}

const colorPalette = [
  '#6C5B7B', // Purple
  '#C06C84', // Pink
  '#F67280', // Coral
  '#F8B195', // Peach
  '#F4A261', // Orange
  '#2A9D8F', // Teal
  '#E9C46A', // Yellow
  '#264653', // Dark Blue
  '#D9BF77', // Light Brown
  '#E07A5F', // Red
  '#3C6E71', // Blue Gray
  '#FF6B6B', // Light Red
];

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const BarChartReChart: React.FC<DataProps> = ({ chartData, startDate, endDate }) => {

  // Función para obtener todos los meses dentro del rango de fechas
  const getMonthsInRange = (startDate: Date | null, endDate: Date | null): { year: number, month: string }[] => {
    if (!startDate || !endDate) {
      return months.map((month, index) => ({ year: new Date().getFullYear(), month }));
    }

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();

    const monthsInRange: { year: number, month: string }[] = [];

    for (let year = startYear; year <= endYear; year++) {
      const start = year === startYear ? startMonth : 0;
      const end = year === endYear ? endMonth : 11;

      for (let month = start; month <= end; month++) {
        monthsInRange.push({ year, month: months[month] });
      }
    }

    return monthsInRange;
  };

  const transformData = (data: BarberData[]): TransformedData[] => {
    const monthsInRange = getMonthsInRange(startDate, endDate);
    const transformedDataMap: { [key: string]: TransformedData } = {};

    // Utilizar un Set para almacenar todos los barberos únicos
    const barberSet = new Set<string>();

    // Procesar los datos de entrada
    data.forEach(({ nameBarber, lastNameBarber, year, month, total_turnos: totalTurnos }) => {
      const monthIndex = Number(month) - 1;
      const monthName = months[monthIndex] || 'Unknown';
      const key = `${monthName} ${year}`;

      if (!transformedDataMap[key]) {
        transformedDataMap[key] = { name: key };
      }

      const barberKey = `${nameBarber} ${lastNameBarber}`;
      barberSet.add(barberKey);

      // Establecer el total de turnos para el barbero y mes específico
      transformedDataMap[key][barberKey] = totalTurnos;
    });

    // Asegurarse de que todos los meses en el rango estén representados
    monthsInRange.forEach(({ year, month }) => {
      const monthName = month;
      const key = `${monthName} ${year}`;

      if (!transformedDataMap[key]) {
        transformedDataMap[key] = { name: key };
      }

      // Inicializar el total de turnos a 0 para todos los barberos en este mes
      barberSet.forEach(barber => {
        if (!transformedDataMap[key][barber]) {
          transformedDataMap[key][barber] = 0;
        }
      });
    });

    // Convertir el objeto a un array y ordenar por año y mes
    const transformedDataArray = Object.values(transformedDataMap);

    // Ordenar los datos por año y mes
    transformedDataArray.sort((a, b) => {
      const [monthA, yearA] = a.name.split(' ');
      const [monthB, yearB] = b.name.split(' ');

      // Obtener el índice del mes para ordenar correctamente
      const indexMonthA = months.indexOf(monthA);
      const indexMonthB = months.indexOf(monthB);

      // Comparar años primero, luego meses
      return (yearA !== yearB) ? (parseInt(yearA) - parseInt(yearB)) : (indexMonthA - indexMonthB);
    });

    return transformedDataArray;
  };




  const transformedData = transformData(chartData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={transformedData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" style={{ fontSize: 12 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(transformedData[0] || {}).filter(key => key !== 'name').map((key, index) => (
          <Bar key={key} dataKey={key} fill={colorPalette[index % colorPalette.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartReChart;
