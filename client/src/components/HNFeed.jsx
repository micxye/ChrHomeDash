import React from 'react';
import axios from 'axios';

export default class HNFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topStories: [],
        }
    }

    componentDidMount() {
        this.getTopPosts();
    }

    getTopPosts() {
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(response => {
                this.setState({ topStories: response.data });
                console.log(this.state.topStories);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div id="hnfeed">
                hnfeed
            </div>
        )
    }
}