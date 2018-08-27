import React from 'react';
import DateTime from './DateTime.jsx';
import WeatherWidget from './WeatherWidget.jsx';
import TwitterFeed from './TwitterFeed.jsx';
import HNFeed from './HNFeed.jsx';

export default class DashboardHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="dashboardhome">
                <div id="timeandweather">
                    <DateTime />
                    <WeatherWidget />
                </div>
                <div id="nontimeandweather">
                    <div id="homeleft">
                        <iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=michaelyeahh%40gmail.com&amp;color=%23A32929&amp;src=6r0la6ac4bnk4mjvri89dr59vs%40group.calendar.google.com&amp;color=%23528800&amp;ctz=America%2FLos_Angeles" id="calendar"></iframe>
                    </div>
                    <div id="homeright">
                        <HNFeed />
                        <TwitterFeed />
                    </div>
                </div>
            </div>
        )
    }
}