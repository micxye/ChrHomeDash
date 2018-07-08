import React from 'react';
import WeatherHourlyEntry from './WeatherHourlyEntry.jsx';

export default class WeatherHourlyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }

    render() {
        return (
            <div id="weatherhourlycontainer">
                <div id="weatherhourlysummary">{this.props.weatherHourly.summary}</div>
                <div id="weatherhourlyscrollbox">
                    {this.props.weatherHourly.data.map((hour, i) => {
                        if (i % 2 === 0) {
                            return <WeatherHourlyEntry time={i}/>
                        }
                    })}
                </div>
            </div>
        )
    }
}