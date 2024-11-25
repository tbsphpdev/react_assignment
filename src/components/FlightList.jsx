import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const FlightList = ({ flights }) => {
    return (
        <Grid container spacing={3} sx={{ mt: 3 }}>
            {flights.map((flight, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box
                        p={2}
                        border="1px solid #ccc"
                        borderRadius="8px"
                        boxShadow={1}
                        sx={{
                            backgroundColor: 'background.paper',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.02)' },
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            {flight.airline}
                        </Typography>
                        <Typography variant="body1">
                            {flight.origin} → {flight.destination}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: {flight.price}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default FlightList;
