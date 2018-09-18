import moment from 'moment';
import URL from 'url-parse';

const HNFeedItem = ({ story, ask, number }) => {
    const { id, title, url, score, descendants, time, by } = story;
    const hostname = ask ? null : `(${new URL(url).hostname})`;
    return (
        <li className="hnfeeditem">
            <div className="storyrank">
                {number < 10 ? <span className="space">y</span> : ""}{number}.
            </div>
            <div>
                <a href={url} className="storylink">
                    {title}&nbsp;
                    <span className="storysource">{hostname}</span>
                </a><br></br>
                <span className="storyinfo">{score} points by {by} {moment(moment.unix(time)).fromNow()} |&nbsp;</span>
                <a href={`https://news.ycombinator.com/item?id=${id}`} className="hnlink">{descendants} Comments</a>
            </div>
        </li>
    );
}

export default HNFeedItem;