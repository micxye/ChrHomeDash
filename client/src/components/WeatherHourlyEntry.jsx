import React from 'react';

export default class WeatherHourlyEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const skycons = new Skycons({ "color": "white" });
        skycons.play();
        skycons.add(`weatherhourlyicon${this.props.id}`, this.props.weather.icon);
    }

    render() {
        return (
            <div className="weatherhourlyentry">
                <div className="weatherhourlytime">{(() => {
                    if (this.props.time === 24) {
                        return "12 AM"
                    } else if (this.props.time >= 12) {
                        return (this.props.time % 12).toString() + " PM";
                    } else {
                        return this.props.time.toString() + " AM";
                    }
                })()}</div>
                <canvas id={`weatherhourlyicon${this.props.id}`} width="30" height="30"></canvas>
                <div className="weatherhourlytemp">{Math.round(this.props.weather.temperature)}˚</div>
            </div>
        )
    }
}