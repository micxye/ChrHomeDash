import React from 'react';
import FadeIn from 'react-fade-in';
import TwitterFeedItem from './TwitterFeedItem.jsx';
import TweetErrorBoundary from './TweetErrorBoundary.jsx'

export default class TwitterFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderTweets() {
        const { twitterFeed } = this.props;
        if (twitterFeed.length !== 0) {
            console.log(twitterFeed)
            return (
                <FadeIn> {
                    twitterFeed.map((tweet, i) => (
                        <TweetErrorBoundary key={i}>
                            <TwitterFeedItem tweet={tweet} key={i} />
                        </TweetErrorBoundary>
                    ))
                } </FadeIn>
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