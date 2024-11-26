import React, { useState } from "react";
import {
    Button,
    IconButton,
    Box,
    Typography,
    Grid,
    ClickAwayListener,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";

const PassengerSelector = () => {
    const [isOpen, setIsOpen] = useState(false); // To toggle the dropdown visibility
    const [passengerCount, setPassengerCount] = useState({
        adults: 1,
        children: 0,
        infantsSeat: 0,
        infantsLap: 0,
    });

    const MAX_PASSENGERS = 9;

    const handleToggle = () => setIsOpen(!isOpen);

    const handleIncrement = (type) => {
        if (totalPassengers < MAX_PASSENGERS) {
            setPassengerCount((prev) => ({
                ...prev,
                [type]: prev[type] + 1,
            }));
        }
    };

    const handleDecrement = (type) => {
        if (passengerCount[type] > 0) {
            setPassengerCount((prev) => ({
                ...prev,
                [type]: prev[type] - 1,
            }));
        }
    };

    const totalPassengers =
        passengerCount.adults +
        passengerCount.children +
        passengerCount.infantsSeat +
        passengerCount.infantsLap;

    return (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
                {/* Passenger Icon with Total Count */}
                <Button
                    variant="outlined"
                    onClick={handleToggle}
                    startIcon={<PersonIcon />}
                    sx={{ textTransform: "none", height: "55px" }}
                >
                    {totalPassengers} Passengers
                </Button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            zIndex: 10,
                            width: { xs: 250, sm: 300 },
                            padding: 2,
                            backgroundColor: "white",
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>
                            Passengers
                        </Typography>
                        {[{
                            label: "Adults",
                            ageGroup: "",
                            type: "adults",
                        }, {
                            label: "Children",
                            ageGroup: "Aged 2-11",
                            type: "children",
                        }, {
                            label: "Infants",
                            ageGroup: "In seat",
                            type: "infantsSeat",
                        }, {
                            label: "Infants",
                            ageGroup: "On lap",
                            type: "infantsLap",
                        }].map((item, index) => (
                            <Grid
                                container
                                key={index}
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ marginBottom: 1 }}
                            >
                                <Box>
                                    <Typography>{item.label}</Typography>
                                    {item.ageGroup && (
                                        <Typography variant="caption" color="textSecondary">
                                            {item.ageGroup}
                                        </Typography>
                                    )}
                                </Box>
                                <Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDecrement(item.type)}
                                        disabled={passengerCount[item.type] === 0}
                                    >
                                        <RemoveIcon />
                                    </IconButton>
                                    <Typography
                                        display="inline"
                                        sx={{ margin: "0 10px", fontSize: "16px" }}
                                    >
                                        {passengerCount[item.type]}
                                    </Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleIncrement(item.type)}
                                        disabled={totalPassengers >= MAX_PASSENGERS}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                        <Box display="flex" justifyContent="space-between" marginTop={2}>
                            <Button
                                variant="text"
                                sx={{ color: "error.main" }}
                                onClick={() => {
                                    setPassengerCount({
                                        adults: 1,
                                        children: 0,
                                        infantsSeat: 0,
                                        infantsLap: 0,
                                    });
                                    setIsOpen(false);
                                }}
                            >
                                Reset
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            >
                                Done
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </ClickAwayListener>
    );
};

export default PassengerSelector;
