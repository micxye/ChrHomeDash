import React from 'react';

export default class WeatherHourlyEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="weatherhourlyentry">
                {this.props.time}
            </div>
        )
    }
}