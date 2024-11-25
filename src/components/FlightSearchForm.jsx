import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const FlightSearchForm = ({ onSearch }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [adults, setAdults] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ origin, destination, departureDate, returnDate, adults });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                backgroundColor: 'background.paper',
                p: 3,
                borderRadius: 2,
                boxShadow: 2,
                width: '100%',
                maxWidth: 500,
                margin: '0 auto',
            }}
        >
            <TextField
                label="Adults"
                type="number"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                required
                inputProps={{ min: 1 }}
            />
            <Button variant="contained" color="primary" type="submit">
                Search Flights
            </Button>
        </Box>
    );
};

export default FlightSearchForm;
