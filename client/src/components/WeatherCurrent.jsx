import React from 'react';
import WeatherSearchForm from './WeatherSearchForm.jsx';

export default class WeatherCurrent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const skycons = new Skycons({ "color": "white" });
        skycons.play();
        skycons.add("currentweathericon", this.props.weather.currently.icon);
    }

    render() {
        return (
            <div id="weathercurrentbox">
                <canvas id="currentweathericon" width="90" height="90"></canvas>
                <div id="temperaturecurrentbox">
                    <div id="weathercityandsearch">
                        <div id="currentcity">{this.props.weather.city}</div>
                        <div className="suggestionsoverlay"></div>
                        <WeatherSearchForm handleSuggestionClick={this.props.handleSuggestionClick}/>
                    </div>
                    <div id="currenttempsummary">
                        {Math.round(this.props.weather.currently.temperature)}˚ {this.props.weather.currently.summary}  
                    </div>
                </div>
            </div>
        )
    }
}