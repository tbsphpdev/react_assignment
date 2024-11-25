import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    Grid
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TimerIcon from '@mui/icons-material/Timer';

const FlightResults = ({ results = [] }) => {
    if (!results.length) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="300px"
                textAlign="center"
            >
                <Typography variant="h6" color="textSecondary">
                    No Flights Found. Please adjust your search criteria.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: 3
                }}
            >
                Flight Search Results ({results.length} flights)
            </Typography>

            <Grid container spacing={3}>
                {results.map((flight, index) => {
                    const content = flight?.content || {};
                    const outbound = content.outboundLeg || {};
                    const inbound = content.inboundLeg || {};

                    return (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <Card
                                variant="outlined"
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Chip
                                            icon={<AttachMoneyIcon />}
                                            label={`Price: ${content.price || 'N/A'}`}
                                            color="primary"
                                            variant="outlined"
                                        />
                                        <Chip
                                            label={content.direct ? 'Direct' : 'Connecting'}
                                            color={content.direct ? 'success' : 'warning'}
                                            size="small"
                                        />
                                    </Box>

                                    <Box mb={2}>
                                        <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                                            <FlightTakeoffIcon fontSize="small" sx={{ mr: 1 }} />
                                            Outbound: {outbound.originAirport?.skyCode || 'N/A'} → {outbound.destinationAirport?.skyCode || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {outbound.localDepartureDateLabel || 'N/A'}
                                        </Typography>
                                    </Box>

                                    <Box mb={2}>
                                        <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                                            <FlightLandIcon fontSize="small" sx={{ mr: 1 }} />
                                            Return: {inbound.originAirport?.skyCode || 'N/A'} → {inbound.destinationAirport?.skyCode || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {inbound.localDepartureDateLabel || 'N/A'}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center">
                                        <TimerIcon fontSize="small" sx={{ mr: 1 }} />
                                        <Typography variant="body2" color="textSecondary">
                                            Duration: {content.tripDuration || 'N/A'}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default FlightResults;