import React from 'react';
import ToDoList from './ToDoList.jsx';
import DateTime from './DateTime.jsx';
import WeatherWidget from './WeatherWidget.jsx';
import TwitterFeed from './TwitterFeed.jsx';
import HNFeed from './HNFeed.jsx';
import InspiringQuote from './InspiringQuote.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div id="appcontainer">
                <div id="leftsidecontainer">
                    <ToDoList />
                    <img src="https://i.imgur.com/zKq7Q9n.gif" alt="yung goon jung yoon" id="jung"></img>
                    <InspiringQuote />
                </div>
                <div id="rightsidecontainer">
                    <div id="timeandweathercontainer">
                        <DateTime />
                        <WeatherWidget />
                    </div>
                    <div id="calendarandfeedscontainer">
                        <div id="calendarcontainer">
                            <iframe id="calendar" src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=michaelyeahh%40gmail.com&amp;color=%23A32929&amp;src=6r0la6ac4bnk4mjvri89dr59vs%40group.calendar.google.com&amp;color=%23528800&amp;ctz=America%2FLos_Angeles"></iframe>
                        </div>
                        <div id="feedscontainer">
                            <HNFeed />
                            <TwitterFeed />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}