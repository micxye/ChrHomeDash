import React from 'react';
import moment from 'moment';
import URL from 'url-parse';

export default class HNFeedItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, title, url, score, descendants, time, by } = this.props.story;
        const hostname = this.props.ask ? null : `(${new URL(url).hostname})`;
        
        return (
            <li className="hnfeeditem">
                <div className="storyrank">
                    {this.props.number}.
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
        )
    }
}