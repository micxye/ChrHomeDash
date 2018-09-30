import moment from 'moment';
import parseText from 'npm-text-parser';
import ReactHtmlParser from 'react-html-parser';

const TwitterFeedItem = ({ tweet }) => {
    const status = parseStatus(tweet);
    return (
        <li className="twitterfeeditem">
            <img src={status.userPic} alt="Smiley face" className="twitteruserpic"/>
            <div className="tweetcontainer">
                <div className="twitteruserid">
                    <a className="twitteruser" href={`https://www.twitter.com/${status.userName}`}>{status.user}</a>
                    {(() => status.userVerified ? <img src="verified.png" className="userverified"/> : null)()}
                    <span className="twitterusername">{status.userName}</span>
                    <span className="tweettime">&nbsp;·&nbsp;{status.createdAt}</span>
                </div>
                <div className="tweettext">
                    {ReactHtmlParser(status.text)}
                </div>
                {renderQuote(status)}
                <div className="likesbar">
                
                </div>
            </div>
        </li>
    );
    
}

const parseStatus = (tweet) => {
    const status = {
        createdAt: tweet.created_at,
        user: tweet.user.name,
        userName: `@${tweet.user.screen_name}`,
        userPic: tweet.user.profile_image_url_https,
        userVerified: tweet.user.verified,
        text: parseStatusText(tweet.full_text),
        link: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
        isQuoteStatus: tweet.is_quote_status,
    };
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
    let statusText = parseText.parseUrl(text);
    return addProfileLinks(statusText);
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
    }
}

export default TwitterFeedItem;