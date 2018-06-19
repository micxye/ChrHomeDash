import React from 'react';
import ip from 'ip';
import axios from 'axios';

export default class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "136.25.147.85", //ip.address(),
            weather: ""
        }
    }

    componentDidMount() {
        this.getLocalWeather();
    }

    getLocalWeather() {
        const context = this;
        // get latitude, longitude, city from IPSTACK with client IP
        axios.post(`http://localhost:8888/localweather`, { ip: this.state.ip })
            .then(function (response) {
                console.table(response.data);
                context.setState({
                    weather: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div id="weatherwidget">
                {this.state.weather.city}
            </div>
        )
    }
}