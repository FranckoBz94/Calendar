import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

interface DataProps {
  chartData: any;
}

const PieChartGraphic: React.FC<DataProps> = ({ chartData }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Box width="100%">
        <PieChart
          series={[
            {
              data: chartData,
              arcLabel: getArcLabel,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30 },
            },
          ]}
          height={isSmallScreen ? 200 : 300} // Ajusta la altura según el tamaño de pantalla
          width={isSmallScreen ? 300 : 550} // Ajusta el ancho según el tamaño de pantalla
        />
      </Box>
    </>
  );
}

export default PieChartGraphic;
