import React from 'react';
import ip from 'ip';
import $ from 'jquery';
import axios from 'axios';
import WeatherCurrent from './WeatherCurrent.jsx';
import WeatherHourlyList from './WeatherHourlyList.jsx';
import WeatherDailyList from './WeatherDailyList.jsx';
import WeatherLoading from './WeatherLoading.jsx';

export default class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "136.25.147.85", //ip.address(),
            weather: ""
        }
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    }

    componentDidMount() {
        this.getLocalWeather();
    }

    getLocalWeather() {
        // get latitude, longitude, city from IPSTACK with client IP
        axios.post(`http://localhost:8888/localweather`, { ip: this.state.ip })
            .then(response => {
                this.setState({ weather: response.data });
                this.initializeForecastDropdowns();
                $(document).ready(() => $('#app').fadeIn());
            })
            .catch(error => console.log(error));
    }

    changeWeather(place) {
        axios.post(`http://localhost:8888/weather`, { place })
            .then(response => {
                this.setState({ weather: response.data });
                this.initializeForecastDropdowns();
            })
            .catch(error => console.log(error));
    }

    initializeForecastDropdowns() {
        const triggers = document.querySelectorAll('.forecast > li');
        const background = document.querySelector('.dropdownbackground');
        const nav = document.querySelector('#forecastnav');

        function handleEnter() {
            this.classList.add('trigger-enter');
            setTimeout(() => this.classList.add('trigger-enter-active'), 150);
            background.classList.add('open');
            
            const dropdown = this.querySelector('.dropdown');
            const dropdownCoords = dropdown.getBoundingClientRect();
            const navCoords = nav.getBoundingClientRect();

            const coords = {
                height: dropdownCoords.height,
                width: dropdownCoords.width,
                top: dropdownCoords.top - navCoords.top,
                left: dropdownCoords.left - navCoords.left,
            }

            background.style.setProperty('width', `${coords.width}px`);
            background.style.setProperty('height', `${coords.height}px`);
            background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
        }

        function handleLeave() {
            this.classList.remove('trigger-enter', 'trigger-enter-active');
            background.classList.remove('open');
            background.style.setProperty('width', `1px`);
            background.style.setProperty('height', `1px`);
        }

        triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
        triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
    }

    handleSuggestionClick(place) {
        this.setState({ weather: "" });
        this.changeWeather(place);
    }

    render() {
        return this.state.weather === "" ? <WeatherLoading /> :
            <div id="weatherwidget">
                <WeatherCurrent weather={this.state.weather} handleSuggestionClick={this.handleSuggestionClick}/>
                <nav id="forecastnav">
                    <div className="dropdownbackground"></div>
                    <ul className="forecast">
                        <li>
                            <span id="48hourforecast">&nbsp;&nbsp;48 Hour Forecast&nbsp;&nbsp;</span>
                            <WeatherHourlyList weatherHourly={this.state.weather.hourly} />
                        </li>
                        <li>
                            <span id="7dayforecast">&nbsp;&nbsp;7 Day Forecast&nbsp;&nbsp;</span>
                            <WeatherDailyList weatherDaily={this.state.weather.daily} />
                        </li>
                    </ul>
                </nav>
            </div>
    }
}