import React from 'react';
import ip from 'ip';
import axios from 'axios';
import ToDoList from './ToDoList.jsx';
import DateTime from './DateTime.jsx';
import WeatherWidget from './WeatherWidget.jsx';
import TwitterFeed from './TwitterFeed.jsx';
import HNFeed from './HNFeed.jsx';
import InspiringQuote from './InspiringQuote.jsx';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import FadeIn from 'react-fade-in';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            ip: "136.25.147.85", //ip.address(),
            weather: "",
            topStories: [],
            bestStories: [],
            askStories: [],
            showStories: [],
            userTimelines: {},
        }
        this.displayApp = this.displayApp.bind(this);
        this.changeWeather = this.changeWeather.bind(this);
    }

    componentDidMount() {
        this.getTwitterTimelines();
        this.getHNPosts('topstories');
        this.getHNPosts('beststories');
        this.getHNPosts('askstories');
        this.getHNPosts('showstories');
        this.getLocalWeather();
    }

    displayApp() {
        this.setState({ loading: false });
        this.initializeForecastDropdowns();
    }

    getLocalWeather() {
        axios.post(`http://localhost:8888/localweather`, { ip: this.state.ip })
            .then(response => {
                this.setState({ weather: response.data });
                this.displayApp();
            })
            .catch(error => {
                console.log(error);
                this.displayApp();
            });
    }

    changeWeather(place) {
        this.setState({ weather: ""});
        axios.post(`http://localhost:8888/weather`, { place })
            .then(response => {
                this.setState({ weather: response.data });
                this.initializeForecastDropdowns();
            })
            .catch(error => console.log(error));
    }

    initializeForecastDropdowns() {
        const triggers = document.querySelectorAll('.forecast > li'),
              background = document.querySelector('.dropdownbackground'),
              nav = document.querySelector('#forecastnav');

        function handleEnter() {
            this.classList.add('trigger-enter');
            setTimeout(() => this.classList.add('trigger-enter-active'), 150);
            background.classList.add('open');

            const dropdown = this.querySelector('.dropdown'),
                  dropdownCoords = dropdown.getBoundingClientRect(),
                  navCoords = nav.getBoundingClientRect(),
                  coords = {
                    height: dropdownCoords.height,
                    width: dropdownCoords.width,
                    top: dropdownCoords.top - navCoords.top,
                    left: dropdownCoords.left - navCoords.left,
                  }
            background.style.setProperty('width', `${coords.width}px`);
            background.style.setProperty('height', `${coords.height}px`);
            background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
        }
        function handleLeave() {
            this.classList.remove('trigger-enter', 'trigger-enter-active');
            background.classList.remove('open');
            background.style.setProperty('width', `1px`);
            background.style.setProperty('height', `1px`);
        }
        triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
        triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
    }

    getHNPosts(type) {
        axios.get(`https://hacker-news.firebaseio.com/v0/${type}.json`)
            .then(response => {
                let stories = [];
                response.data.slice(0, 30).forEach((story, i) => {
                    axios.get(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
                        .then(response => {
                            stories.push(response.data);
                            if (i === 29) {
                                if (type === 'topstories') this.setState({ topStories: stories });
                                if (type === 'beststories') this.setState({ bestStories: stories });
                                if (type === 'askstories') this.setState({ askStories: stories });
                                if (type === 'showstories') this.setState({ showStories: stories });
                            }
                        })
                        .catch(error => console.log(error));
                });
            })
            .catch(error => console.log(error));
    }

    getTwitterTimelines() {
        axios.get('http://localhost:8888/tweets')
            .then(response => {
                console.log(response.data);
                this.setState({ userTimelines: response.data })
            })
            .catch(error => console.log(error));
    }

    render() {
        return this.state.loading ? <div id="apploading"></div> :
            <FadeIn>
                <div id="appcontainer">
                    <div id="leftsidecontainer">
                        <ToDoList />
                        <FadeIn>
                            <img src="https://i.imgur.com/zKq7Q9n.gif" alt="yung goon jung yoon" id="jung"></img>
                            <InspiringQuote />
                        </FadeIn>
                    </div>
                    <div id="rightsidecontainer">
                        <div id="timeandweathercontainer">
                            <DateTime />
                            <WeatherWidget weather={this.state.weather} displayApp={this.displayApp} changeWeather={this.changeWeather} />
                        </div>
                        <div id="calendarandfeedscontainer">
                            <div id="calendartradingviewcontainer">
                                <div id="calendarcontainer">
                                    <iframe id="calendar" src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=michaelyeahh%40gmail.com&amp;color=%2329527A&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23125A12&amp;src=6r0la6ac4bnk4mjvri89dr59vs%40group.calendar.google.com&amp;color=%23875509&amp;src=xmicye%40gmail.com&amp;color=%23691426&amp;ctz=America%2FLos_Angeles"></iframe>
                                </div>
                                <div id="tradingviewcontainer">
                                    <TradingViewWidget
                                        symbol="BITFINEX:BTCUSD"
                                        range="1m"
                                        style="3"
                                        withdateranges="true"
                                        theme={Themes.LIGHT}
                                        locale="en"
                                        autosize
                                    />
                                </div>
                            </div>
                            <div id="feedscontainer">
                                <FadeIn>
                                    <HNFeed topStories={this.state.topStories} bestStories={this.state.bestStories} askStories={this.state.askStories} showStories={this.state.showStories}/>
                                    <TwitterFeed />
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
    }
}
