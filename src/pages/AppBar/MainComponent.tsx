import React from 'react';
import { Box, } from '@mui/material';

interface MainComponentProps {
    children?: React.ReactNode;
}

const MainComponent = ({ children }: MainComponentProps) => {
    return (
        <Box >
            {children}
        </Box>
    )
}

export default MainComponent;
