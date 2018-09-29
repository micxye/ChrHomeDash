const TwitterFeedItem = ({ tweet }) => {
    
    return (
        <li className="twitterfeeditem">
            {tweet.full_text}
        </li>
    );
}

export default TwitterFeedItem;