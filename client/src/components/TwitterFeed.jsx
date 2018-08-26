import React from 'react';
import deepEqual from 'deep-equal';

export default class TwitterFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    createFeed() {
        let twitterFeed = [];
        for (userFeed in twitterUserTimelines) {
            twitterFeed.concat(userFeed)
        }
        return twitterFeed.sort((a, b) => b.created_at - a.created_at);
    }

    render() {
        return (
            <div id="twitterfeed">
                
            </div>
        )
    }
}