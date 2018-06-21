import React from 'react';

export default class WeatherCurrent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const skycons = new Skycons({ "color": "black" });
        skycons.play();
        skycons.add("currentweathericon", this.props.weather.currently.icon);
    }

    render() {
        return (
            <div id="weathercurrentbox">
                <div id="currentcity">{this.props.weather.city}</div>
                <canvas id="currentweathericon" width="70" height="70"></canvas>
                <div id="temperaturecurrentbox">
                    <div id="currenttempsummary">
                        {this.props.weather.currently.temperature} {this.props.weather.currently.summary}  
                    </div>
                    <div id="currenthighlow">
                        High: {this.props.weather.daily.data[0].temperatureHigh} Low: {this.props.weather.daily.data[0].temperatureLow}
                    </div>
                </div>
            </div>
        )
    }
}