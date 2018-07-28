import React from 'react';
import DateTime from './DateTime.jsx';
import WeatherWidget from './WeatherWidget.jsx';
import HomeFocus from './HomeFocus.jsx';
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
                        <HomeFocus />
                    </div>
                    <div id="homeright">
                        <TwitterFeed />
                        <HNFeed />
                    </div>
                </div>
            </div>
        )
    }
}