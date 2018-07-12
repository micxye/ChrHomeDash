import React from 'react';
import WeatherDailyEntry from './WeatherDailyEntry.jsx';

export default class WeatherDailyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDay: null
        }
    }

    componentDidMount() {
        const now = new Date();
        const currentDay = now.getDay();
        this.setState({ currentDay })
    }

    render() {
        return (
            <div className="dropdown" id="weatherdailycontainer">
                <div id="weatherdailysummary">{this.props.weatherDaily.summary}</div>
                {this.props.weatherDaily.data.map((weather, i) => {
                    if (i > 0) return <WeatherDailyEntry key={i} id={i} weather={weather} day={(this.state.currentDay + i) % 7}/>
                })}
            </div>
        )
    }
}