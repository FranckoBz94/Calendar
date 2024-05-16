import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';

const SkeletonCalendar = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={1}>
                {[...Array(5)].map((_, index) => (
                    <Grid item xs={12} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={50} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SkeletonCalendar;