import React from 'react';

export default class WeatherDailyEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const skycons = new Skycons({ "color": "white" });
        skycons.play();
        skycons.add(`weatherdailyicon${this.props.id}`, this.props.weather.icon);
    }

    render() {
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return (
            <div className="weatherdailyentry">
                <span className="weatherdailyweekday">{weekDays[this.props.day]}</span>
                <canvas className="weatherdailyicon" id={`weatherdailyicon${this.props.id}`} width="30" height="30"></canvas>
                <span className="weatherdailyhigh">{Math.round(this.props.weather.temperatureHigh)}˚</span>
                <span className="weatherdailylow">{Math.round(this.props.weather.temperatureLow)}˚</span>
            </div>
        )
    }
}