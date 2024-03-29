import axios from 'axios';
import React from 'react';
import { Textfit } from 'react-textfit';

export default class InspiringQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '\"Perfection is not attainable, but if we chase perfection we can catch excellence.\"' 
        }
    }

    componentDidMount() {
        this.getQuote();
    }

    getQuote() {
        axios.get('http://quotes.rest/qod.json')
            .then(response => {
                this.setState({ quote: '\"' + response.data.contents.quotes[0].quote + '\"' });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <Textfit>
                <div id="quotecontainer">
                    {this.state.quote}
                </div>
            </Textfit>
        )
    }
}