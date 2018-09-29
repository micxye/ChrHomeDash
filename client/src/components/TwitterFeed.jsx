import React from 'react';
// import deepEqual from 'deep-equal';
import FadeIn from 'react-fade-in';
import TwitterFeedItem from './TwitterFeedItem.jsx';

export default class TwitterFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            twitterFeed: [],
            view: 'feed',
        }
    }

    componentDidMount() {
        this.createFeed();
    }

    createFeed() {
        let twitterFeed = [];
        const { userTimelines } = this.props;
        for (let user in userTimelines) {
            twitterFeed = twitterFeed.concat(userTimelines[user]);
        }
        twitterFeed.sort((a, b) => b.created_at - a.created_at);
        this.setState({ twitterFeed });
    }

    renderTweets() {
        const { twitterFeed } = this.state;
        if (twitterFeed.length !== 0) {
            return (
                <FadeIn>
                    {twitterFeed.map((tweet, i) => (
                        <TwitterFeedItem tweet={tweet} key={i}/>
                    ))}
                </FadeIn>
            );
        } 
    }

    render() {
        return (
            <div id="twitterfeed">
                <div id="twittertopbar">
                    <img src="twit.svg" id="twit"></img>
                    <span id="twitter">Twitter</span>
                </div>
                <ul id="twitterfeedlist">
                    {this.renderTweets()}
                </ul>
            </div>
        )
    }
}