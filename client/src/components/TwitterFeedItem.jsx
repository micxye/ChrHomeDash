import moment from 'moment';
import parseText from 'npm-text-parser';
import ReactHtmlParser from 'react-html-parser';

const TwitterFeedItem = ({ tweet }) => {
    const status = parseStatus(tweet);
    return (
        <li className="twitterfeeditem">
            {renderRetweet(status)}
            <div className="tweet">
                <div>
                    <img src={status.userPic} alt="Smiley face" className="twitteruserpic" />
                </div>
                <div className="tweetcontainer">
                    <div className="twitteruserid">
                        <a className="twitteruser" href={`https://www.twitter.com/${status.userName}`}>{status.user}</a>
                        {(() => status.userVerified ? <img src="verified.png" className="userverified" /> : null)()}
                        <span className="twitterusername">{status.userName}</span>
                        <span className="tweettime">&nbsp;·&nbsp;{status.createdAt}</span>
                    </div>
                    <div className="tweettext">
                        {ReactHtmlParser(status.text)}
                    </div>
                    {renderQuote(status)}
                    <div className="likesbar">
                        <div className="likescount">
                            <img src="heart.svg" alt="♥" className="likesheart" />
                            <span className="likesbarnum">{status.likes}</span>
                        </div>
                        <div className="retweetscount">
                            <img src="re.svg" alt="\\" className="retweeticon" />
                            <span className="likesbarnum">{status.retweets}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
    
}

const parseStatus = (tweet) => {
    const status = {};

    if (tweet.retweeted_status) {
        status.retweeter = tweet.user.name;
        tweet = tweet.retweeted_status;
    }
    status.createdAt = tweet.created_at;
    status.user = tweet.user.name;
    status.userName = `@${tweet.user.screen_name}`;
    status.userPic = tweet.user.profile_image_url_https;
    status.userVerified = tweet.user.verified;
    status.text = parseStatusText(tweet.full_text);
    status.link = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
    status.isQuoteStatus = tweet.is_quote_status;
    status.likes = tweet.favorite_count;
    status.retweets = tweet.retweet_count;
    
    if (status.isQuoteStatus) {
        status.quotedText = tweet.quoted_status.full_text;
        status.quotedLink = tweet.quoted_status_permalink.expanded;
        status.quotedUser = tweet.quoted_status.user.name;
        status.quotedUserName = `@${tweet.quoted_status.user.screen_name}`;
        status.quotedUserVerified = tweet.quoted_status.user.verified;
    }
    return status;
}

const parseStatusText = (text) => {
    let statusText = addProfileLinks(text);
    return parseText.parseUrl(statusText);
}

const addProfileLinks = (text) => {
    const handles = [];
    let handle = "";
    for (let char of text) {
        if (char === "@" && !handle) { // possible handle start
            handle += "@"
        } else if (handle[0] === "@" && (char.match(/^[a-z0-9]+$/i) || char === "_")) { // if handle is valid
            handle += char;
        } else if (handle) {
            handles.push(handle);
            handle = "";
        }
    }
    handles.forEach(handle => {
        const link = `<a class="twitterhandle" href="https://www.twitter.com/${handle.slice(1)}">${handle}</a>`;
        text = text.replace(handle, link);
    });
    return text;
}

const renderQuote = (status) => {
    if (status.isQuoteStatus) {
        // render quote
        return (
            <div className="tweetquote">
                <div className="twitteruserid">
                    <span className="quoteduser">{status.quotedUser}</span>
                    {(() => status.quotedUserVerified ? <img src="verified.png" className="userverified" /> : null)()}
                    <span className="twitterusername">{status.quotedUserName}</span>
                </div>
                <div className="quotetext">
                    {status.quotedText}
                </div>
            </div>
        )
    }
}

const renderRetweet = (status) => {
    if (status.retweeter) { // if status is a retweet status
        return (
            <div>
                <img src="re.svg" className="retweet"></img>
                <span className="retweetedby">{status.retweeter} retweeted</span>
            </div>
        )
    }
}

export default TwitterFeedItem;