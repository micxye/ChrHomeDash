import React from 'react';
import DateTime from './DateTime.jsx';
import WeatherWidget from './WeatherWidget.jsx';

export default class DashboardHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="dashboardhome">
                <DateTime />
                <WeatherWidget />
            </div>
        )
    }
}