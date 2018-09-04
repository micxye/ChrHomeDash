import React from 'react';
import axios from 'axios';
import deepEqual from 'deep-equal';

export default class TwitterFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userTimelines: null,
        }
    }

    componentDidMount() {
        this.getTweets();
    }

    getTweets() {
        axios.get('http://localhost:8888/tweets')
            .then(response => {
                this.setState({ userTimelines: response.data })
            })
            .catch(error => console.log(error));
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
                <div id="twittertopbar">
                    <img src="twit.svg" id="twit"></img>
                    <span id="twitter">Twitter</span>
                </div>
                <ul id="twitterfeedlist">

                </ul>
            </div>
        )
    }
}