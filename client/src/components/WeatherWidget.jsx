import React from 'react';
import ip from 'ip';


export default class WeatherWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: ip.address()
        }
    }


    render() {
        return (
            <div id="weatherwidget">
                {this.state.ip}
            </div>
        )
    }
}