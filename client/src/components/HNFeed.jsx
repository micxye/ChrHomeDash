import React from 'react';
import axios from 'axios';
import HNFeedItem from './HNFeedItem.jsx';
import $ from 'jquery';

export default class HNFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topStories: [],
            bestStories: [],
            askStories: [],
            showStories: [],
            view: 'topStories'
        }
        this.changeView = this.changeView.bind(this);
        this.renderView = this.renderView.bind(this);
    }

    componentDidMount() {
        this.getPosts('topstories');
        this.getPosts('beststories');
        this.getPosts('askstories');
        this.getPosts('showstories');
    }

    getPosts(type) {
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

    changeView(view) {
        const { id } = view.target;
        console.log(id)
        if (id === 'hntop') this.setState({ view: 'topStories' });
        if (id === 'hnbest') this.setState({ view: 'bestStories' });
        if (id === 'hnask') this.setState({ view: 'askStories' });
        if (id === 'hnshow') this.setState({ view: 'showStories' });
    }
    
    renderView() {
        const { topStories, bestStories, askStories, showStories, view} = this.state;

        if ( topStories.length > 0) {
            if (view === 'topStories') {
                return topStories.map((story, i) => (
                    <HNFeedItem story={story} key={i} number={i + 1} ask={false}/>
                ));
            } else if (view === 'bestStories') {
                return bestStories.map((story, i) => (
                    <HNFeedItem story={story} key={i} number={i + 1} ask={false}/>
                ));
            } else if (view === 'askStories') {
                return askStories.map((story, i) => (
                    <HNFeedItem story={story} key={i} number={i + 1} ask={true}/>
                ));
            } else if (view === 'showStories') {
                return showStories.map((story, i) => (
                    <HNFeedItem story={story} key={i} number={i + 1} ask={false}/>
                ));
            }
        }
    }

    render() {
        return (
            <div id="hnfeed">
                <div id="hntopbar">
                    <div id="hackernewslogo">
                        <img src="y18.gif" alt="Y" id="ylogo"></img>
                        <span id="hackernews">Hacker News</span>
                    </div>
                    <div id="hnnav">
                        <span id="hntop" onClick={(id) => this.changeView(id)}>top</span>
                        <span>&nbsp;|&nbsp;</span>
                        <span id="hnshow" onClick={(id) => this.changeView(id)}>show</span>
                        <span>&nbsp;|&nbsp;</span>
                        <span id="hnask" onClick={(id) => this.changeView(id)}>ask</span>
                        <span>&nbsp;|&nbsp;</span>
                        <span id="hnbest" onClick={(id) => this.changeView(id)}>best</span>
                    </div>
                </div>
                <ul id="hnfeedlist">
                    {this.renderView()}
                </ul>
            </div>
        )
    }
}