import * as React from 'react';
import axios from 'axios';

export function DownloadWeatherData() {

    const handleDownload = () => {
        const link = document.createElement("a");
        link.target = "_blank";
        link.download = "WeatherData.csv";
        return axios.get("https://interview2022.azurewebsites.net/api/weather/downloadWeatherData",
            {
                responseType: "blob",
            })
            .then(res => {
                link.href = URL.createObjectURL(
                    new Blob([res.data], { type: "text/csv" })
                );
                link.click();
            });
    }

    return (
        <>
            <div>
                <h2>The API collects data from the Calgary, AB weather station every hour.</h2>
                <h3>Click the button to download the data as a .csv file</h3>
                <button onClick={() => handleDownload()}> Download Weather Data </button>
            </div>
        </>
    );
}

export default DownloadWeatherData;