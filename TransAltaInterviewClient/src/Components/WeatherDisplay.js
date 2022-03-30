import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Item from './Item'

export function WeatherDisplay() {
    const [weatherData, setWeatherData] = useState();
    const [valuesSet, setValuesSet] = useState(false);
    const [date, setDate] = useState();

    useEffect(() => {
        if (!valuesSet) {
            axios.get("https://interview2022.azurewebsites.net/api/weather/getWeatherData").then((res) => {
                setWeatherData(res.data);
            }).then(() => {
                let formatDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                    .format(weatherData.timestamp);
                setDate(formatDate);
                setValuesSet(true);
            });
        }
    });

    return (
        <>
            {valuesSet && (
                <Item>
                    Current Weather Data: Calgary, AB - {date}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                        }}            >
                        <Item>Temperature: {weatherData.temperature} C</Item>
                        <Item>Wind Speed: {weatherData.windspeed} km/h</Item>
                        <Item>Wind Gust Speed: {weatherData.windspeedgust} km/h</Item>
                        <Item>Humidity: {weatherData.humidity} %</Item>
                        <Item>Theoretical Power: {weatherData.theoreticalpower} kW</Item>
                    </Box>
                </Item>
            )}
        </>
    );
}

export default WeatherDisplay;