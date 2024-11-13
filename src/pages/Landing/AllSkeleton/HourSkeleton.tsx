import { Box, Grid, Skeleton } from "@mui/material"

const createSkeletonArray = (rows: any, columns: any) => {
    return Array.from({ length: rows * columns }, (_, index) => index);
};

const HourSkeleton = () => {
    const rows = 5;
    const columns = 3;
    return (
        <Grid container spacing={2} >
            {createSkeletonArray(rows, columns).map((_, index) => (
                <Grid item xs={4} md={3} key={index}>
                    <Box
                        sx={{
                            margin: "1px",
                            height: 40,
                            width: "100%",
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
                </Grid>
            ))}

        </Grid>
    )
}

export default HourSkeleton