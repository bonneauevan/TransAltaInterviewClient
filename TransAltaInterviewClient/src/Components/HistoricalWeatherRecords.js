import React, { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import Item from './Item';

export function HistoricalWeatherRecords() {
    const [weatherData, setWeatherData] = useState();
    const [valuesSet, setValuesSet] = useState(false);
    const [dataInvalid, setDataInvalid] = useState(false);
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(2022);

    const years = Array(63).fill().map((_, idx) => 1960 + idx);

    const handleGetData = () => {
        axios.get(`https://interview2022.azurewebsites.net/api/weather/getMonthlySummary?month=${month}&year=${year}`).then((res) => {
            setWeatherData(res.data);
            console.log(weatherData);
            setValuesSet(true);
        }).then(() => {
            if (weatherData.coldestday === 0) {
                setDataInvalid(true);
            }
        });
    }

    const handleMonthChange = (event) => {
        if (year === 2022 && event.target.value >= 4) {
            return;
        }
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        if (month >= 4 && event.target.value === 2022) {
            return;
        }
        setYear(event.target.value);
    };

    return (
        <>
            <Item>
                <div>
                    Historical Weather Data: Pincher Creek, AB
                </div>
                <div>
                    <Select
                        label="Month"
                        value={month}
                        onChange={handleMonthChange}
                    >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                    <Select
                        label="year"
                        value={year}
                        onChange={handleYearChange}
                    >
                        {
                            years.map((year) => {
                                return <MenuItem value={year}>{year}</MenuItem>
                            })
                        }
                    </Select>
                    <button onClick={handleGetData}>Get Data</button>
                </div>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                }}            >
                {valuesSet && !dataInvalid && (
                    <>
                        <Item>Coldest Day of Month: {weatherData.coldestday}</Item>
                        <Item>Coldest Temperature (C): {weatherData.coldesttemp}</Item>
                        <Item>Hottest Day of Month: {weatherData.hottestday}</Item>
                        <Item>Hottest Temperature (C): {weatherData.hottesttemp}</Item>
                        <Item>Days with Wind Gusts >50km/h: {weatherData.maxgustdays}</Item>
                        <Item>Total Percipitation (mm): {weatherData.totalpercipitation}</Item>
                    </>
                    )}
                    {dataInvalid && (
                        <Item>
                            The data you have requested could not be found or is invalid.
                        </Item>
                        )}
                </Box>
            </Item>
        </>
    );
}

export default HistoricalWeatherRecords;