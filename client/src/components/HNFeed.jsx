import React from 'react';
import axios from 'axios';
import HNFeedItem from './HNFeedItem.jsx';
import FadeIn from 'react-fade-in';

export default class HNFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'default',

        }
        this.changeView = this.changeView.bind(this);
        this.renderView = this.renderView.bind(this);
    }

    changeView(view) {
        const { id } = view.target;
        if (id === 'hntop') this.setState({ view: 'topStories' });
        if (id === 'hnbest') this.setState({ view: 'bestStories' });
        if (id === 'hnask') this.setState({ view: 'askStories' });
        if (id === 'hnshow') this.setState({ view: 'showStories' });
    }
    
    renderView() {
        const { view } = this.state,
              { topStories, bestStories, askStories, showStories } = this.props;

        if ( topStories.length > 0) {
            if (view === 'default') {
                return (
                    <FadeIn>
                        {topStories.map((story, i) => (
                            <HNFeedItem story={story} key={i} number={i + 1} ask={false} />
                        ))}
                    </FadeIn>
                );
            } else if (view === 'topStories') {
                return topStories.map((story, i) => (
                            <HNFeedItem story={story} key={i} number={i + 1} ask={false} />
                        ));
            } else if (view === 'bestStories') {
                return bestStories.map((story, i) => (
                            <HNFeedItem story={story} key={i} number={i + 1} ask={false} />
                        ));
            } else if (view === 'askStories') {
                return askStories.map((story, i) => (
                            <HNFeedItem story={story} key={i} number={i + 1} ask={true} />
                        ));
            } else if (view === 'showStories') {
                return showStories.map((story, i) => (
                            <HNFeedItem story={story} key={i} number={i + 1} ask={false} />
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