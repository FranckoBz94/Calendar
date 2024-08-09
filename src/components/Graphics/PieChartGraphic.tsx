import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Typography } from '@mui/material';

interface DataProps {
  chartData: any
}



const PieChartGraphic: React.FC<DataProps> = ({ chartData }) => {

  const getArcLabel = (params: any) => {
    const TOTAL = chartData.map((item: any) => item.value).reduce((a: any, b: any) => a + b, 0);

    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Cantidad de turnos por servicio
      </Typography>
      <PieChart
        series={[{
          data: chartData,
          arcLabel: getArcLabel,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30 },
        }]}
        height={300}
        width={550}
      />
    </>
  )
}

export default PieChartGraphic