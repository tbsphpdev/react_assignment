import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import FlightResults from '../pages/FlightResults';

const HeroSection = () => {
    const [fromOptions, setFromOptions] = useState([]);
    const [toOptions, setToOptions] = useState([]);
    const [loadingFrom, setLoadingFrom] = useState(false);
    const [loadingTo, setLoadingTo] = useState(false);
    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');
    const [results, setResults] = useState([]);
    const [tripType, setTripType] = useState('round-trip');
    const [selectedFromAirport, setSelectedFromAirport] = useState(null);
    const [selectedToAirport, setSelectedToAirport] = useState(null);
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const fetchSuggestions = async (input, setOptions, setLoading) => {
        if (!input || input.length < 2) {
            setOptions([]);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport`,
                {
                    headers: {
                        'x-rapidapi-key': '6455985c4emshc2ad413c392c650p18dd00jsne03535c80615',
                        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
                    },
                    params: { query: input },
                }
            );

            const suggestions = response.data?.data || [];
            setOptions(suggestions.map(item => ({
                label: item.presentation.suggestionTitle,
                value: item.entityId,
                fullData: item
            })));
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setOptions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFromAirportSelect = (event, value) => {
        if (value) {
            setFromInput(value.label || '');
            setSelectedFromAirport(value.fullData || null);
        } else {
            setFromInput('');
            setSelectedFromAirport(null);
        }
    };

    const handleToAirportSelect = (event, value) => {
        if (value) {
            setToInput(value.label || '');
            setSelectedToAirport(value.fullData || null);
        } else {
            setToInput('');
            setSelectedToAirport(null);
        }
    };

    const fetchRoundTrip = async () => {
        if (tripType === 'round-trip' && selectedFromAirport && selectedToAirport) {
            const options = {
                method: 'GET',
                url: 'https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip',
                params: {
                    fromEntityId: selectedFromAirport.skyId,
                    toEntityId: selectedToAirport.skyId,
                },
                headers: {
                    'x-rapidapi-key': '6455985c4emshc2ad413c392c650p18dd00jsne03535c80615',
                    'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
                },
            };

            try {
                const response = await axios.request(options);
                const flightQuotes = response.data?.data.flightQuotes;

                if (!flightQuotes) {
                    console.log('No flight quotes found in the API response.');
                    setResults([]);
                    return;
                }

                setResults(flightQuotes?.results || []);

            } catch (error) {
                console.error('Error fetching round-trip data:', error.message);
                setResults([]);
            }
        } else {
            console.error('Please select both departure and destination airports');
            setResults([]);
        }
    };

    const handleClear = () => {
        // Clear all inputs and states
        setFromInput('');
        setToInput('');
        setSelectedFromAirport(null);
        setSelectedToAirport(null);
        setResults([]);
        setDepartureDate('');
        setReturnDate('');
        setFromOptions([]);
        setToOptions([]);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
                color: 'text.primary',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: `url('https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center top',
            }}
        >
            <Typography variant="h3" sx={{ marginTop: "15%" }}>
                Flights
            </Typography>

            <Box
                component="form"
                sx={{
                    mt: 4,
                    padding: '24px 24px 39px 24px',
                    position: 'relative',
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    flexFlow: 'wrap',
                }}
            >
                <TextField
                    select
                    label="Trip Type"
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                    sx={{ width: 150 }}
                >
                    <MenuItem value="round-trip">Round trip</MenuItem>
                    <MenuItem value="one-way">One-way</MenuItem>
                    <MenuItem value="multi-city">Multi-city</MenuItem>
                </TextField>

                <Autocomplete
                    options={fromOptions}
                    value={selectedFromAirport ? {
                        label: selectedFromAirport.presentation.suggestionTitle,
                        value: selectedFromAirport.entityId,
                        fullData: selectedFromAirport
                    } : null}
                    onChange={handleFromAirportSelect}
                    onInputChange={(event, newInputValue) => {
                        setFromInput(newInputValue);
                        fetchSuggestions(newInputValue, setFromOptions, setLoadingFrom);
                    }}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Where from?"
                            placeholder="Enter departure city"
                            sx={{ minWidth: '200px' }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingFrom ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />

                <Autocomplete
                    options={toOptions}
                    value={selectedToAirport ? {
                        label: selectedToAirport.presentation.suggestionTitle,
                        value: selectedToAirport.entityId,
                        fullData: selectedToAirport
                    } : null}
                    onChange={handleToAirportSelect}
                    onInputChange={(event, newInputValue) => {
                        setToInput(newInputValue);
                        fetchSuggestions(newInputValue, setToOptions, setLoadingTo);
                    }}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    getOptionLabel={(option) => option.label || ''}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Where to?"
                            placeholder="Enter destination city"
                            sx={{ minWidth: '200px' }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingTo ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />

                <TextField
                    type="date"
                    label="Departure"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    type="date"
                    label="Return"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        onClick={fetchRoundTrip}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            padding: '10px 20px',
                            gap: 1,
                        }}
                    >
                        <SearchOutlinedIcon />
                        Search Flights
                    </Button>

                    <Button
                        onClick={handleClear}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'error.main',
                            color: 'white',
                            padding: '10px 20px',
                            gap: 1,
                            '&:hover': {
                                backgroundColor: 'error.dark',
                            }
                        }}
                    >
                        <ClearIcon />
                        Clear
                    </Button>
                </Box>
            </Box>

            <FlightResults results={results} />
        </Box>
    );
};

export default HeroSection;