import React, { Component } from 'react';
import WeatherDisplay from './Components/WeatherDisplay';
import DownloadWeatherData from './Components/DownloadWeatherData';
import HistoricalWeatherRecords from './Components/HistoricalWeatherRecords';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <div>{forecasts.temperature}</div>
        );
    }

    render() {
        return (
            <>
                <div>
                    <h1 id="tabelLabel" >TransAlta Interview App</h1>
                    <HistoricalWeatherRecords />
                    <WeatherDisplay />
                    <DownloadWeatherData />
                </div>

            </>
        );
    }

    async populateWeatherData() {
        const response = await fetch("https://interview2022.azurewebsites.net/api/weather/getWeatherData");
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
