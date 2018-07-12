import React from 'react';
import WeatherHourlyEntry from './WeatherHourlyEntry.jsx';

export default class WeatherHourlyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHour: null
        }
    }

    componentDidMount() {
        const now = new Date();
        this.setState({
            currentHour: now.getHours()
        })
    }

    render() {
        return (
            <div className="dropdown w3-animate-opacity" id="weatherhourlycontainer">
                <div id="weatherhourlysummary">{this.props.weatherHourly.summary}</div>
                <div id="weatherhourlyscrollbox">
                    {this.props.weatherHourly.data.map((hour, i) => {
                        if (i !== 0 && i % 2 === 0) {
                            return <WeatherHourlyEntry key={i} id={i} weather={hour} time={(this.state.currentHour + i) % 24}/>
                        }
                    })}
                </div>
            </div>
        )
    }
}