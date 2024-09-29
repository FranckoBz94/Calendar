import React from 'react';
import { Skeleton, Box } from '@mui/material';

// Helper function to generate a grid of skeleton items
const createSkeletonArray = (rows: any, columns: any) => {
  return Array.from({ length: rows * columns }, (_, index) => index);
};

const CalendarSkeleton = () => {
  // Define the number of rows and columns to simulate a calendar grid
  const rows = 5; // Usually 6 rows for a full month view
  const columns = 7;

  return (

    <Box
      sx={{
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: 1,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #ddd',
          backgroundColor: '#e0e0e0',
        }}
      >
        <p style={{ position: 'absolute', color: "#495057", paddingTop: "48px", fontWeight: 700 }}>Cargando disponibilidad de fechas...</p>
        <Skeleton animation="wave" variant="text" width={100} height={20} />
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "1px",
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          width: '100%',
          height: 'auto',
        }}
      >
        {createSkeletonArray(rows, columns).map((_, index) => (
          <Box
            key={index}
            sx={{
              margin: "1px",
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd',
              backgroundColor: '#e0e0e0',
              borderRadius: "4px"
            }}
          >
            <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CalendarSkeleton;
