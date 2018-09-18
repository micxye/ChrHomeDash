import React from 'react';
import WeatherCurrent from './WeatherCurrent.jsx';
import WeatherHourlyList from './WeatherHourlyList.jsx';
import WeatherDailyList from './WeatherDailyList.jsx';
import WeatherLoading from './WeatherLoading.jsx';

const WeatherWidget = ({ weather, changeWeather }) => {
    return weather === "" ? <WeatherLoading /> :
        <div id="weatherwidget">
            <WeatherCurrent weather={weather} handleSuggestionClick={changeWeather} />
            <nav id="forecastnav">
                <div className="dropdownbackground"></div>
                <ul className="forecast">
                    <li>
                        <span id="48hourforecast">&nbsp;&nbsp;48 Hour Forecast&nbsp;&nbsp;</span>
                        <WeatherHourlyList weatherHourly={weather.hourly} />
                    </li>
                    <li>
                        <span id="7dayforecast">&nbsp;&nbsp;7 Day Forecast&nbsp;&nbsp;</span>
                        <WeatherDailyList weatherDaily={weather.daily} />
                    </li>
                </ul>
            </nav>
        </div>
}

export default WeatherWidget;