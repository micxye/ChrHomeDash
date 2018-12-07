import React from 'react';
import TwitterFeedItem from './TwitterFeedItem.jsx';
import TweetErrorBoundary from './TweetErrorBoundary.jsx';
import FadeIn from 'react-fade-in';

const TwitterFeed = ({ twitterFeed, page, getTweets }) => {
    const onScroll = () => {
        const twitterFeedList = document.getElementById('twitterfeedlist');
        const { scrollTop, scrollHeight, offsetHeight } = twitterFeedList;
        if (scrollHeight - offsetHeight - 300 < scrollTop) {
            document.getElementById('twitterloading').classList.add('show');
        }
        if (scrollHeight - offsetHeight - 20 < scrollTop) {
            getTweets();
        }
    };
    const renderTweets = () => {
        if (page === 1) {
            return (
                <FadeIn>
                    {twitterFeed.map((tweet, i) => (
                        <TweetErrorBoundary key={i}>
                            <TwitterFeedItem tweet={tweet} key={i} />
                        </TweetErrorBoundary>
                    ))}
                </FadeIn>
            );
        } else {
            document.getElementById('twitterloading').classList.remove('show');
            return (
                twitterFeed.map((tweet, i) => (
                    <TweetErrorBoundary key={i}>
                        <TwitterFeedItem tweet={tweet} key={i} />
                    </TweetErrorBoundary>
                ))
            );
        }
    };
    return (
        <div id="twitterfeed">
            <div id="twittertopbar">
                <img src="twit.svg" id="twit"></img>
                <span id="twitter">Twitter</span>
            </div>
            <ul id="twitterfeedlist" onScroll={onScroll}>
                {renderTweets()}
                <div id="twitterloading">loading...</div>
            </ul>
        </div>
    )
}

export default TwitterFeed;