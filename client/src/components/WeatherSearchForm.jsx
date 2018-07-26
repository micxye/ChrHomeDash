import React from 'react';
import $ from 'jquery';

export default class WeatherSearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            cities: [],
            suggestions: [],
        }
        this.findMatches = this.findMatches.bind(this);
    }

    componentDidMount() {
        $('#weathersearchform').submit(e => e.preventDefault());
        this.getCities();
    }
    
    getCities() {
        const endpoint = 'https://gist.githubusercontent.com/micxye/0e78bc5be375f64967971de6d02266c2/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
        fetch(endpoint)
            .then(data => data.json())
            .then(cities => this.setState({ cities }));
    }

    findMatches() {
        const wordToMatch = document.getElementById('weathersearch').value;
        if (wordToMatch.length > 0) {
            let suggestions = this.state.cities.filter(place => {
                const regex = new RegExp(wordToMatch, 'gi');
                return place.city.match(regex) || place.state.match(regex);
            });
            // console.log(wordToMatch);
            // console.log(suggestions);
            this.setState({ suggestions, input: wordToMatch });
        }
    }

    displayMatches() {
        const suggestions = document.querySelector('.citysuggestions');
        suggestions.classList.add('show');

        const html = this.state.suggestions.map(place => {
            const regex = new RegExp(this.state.input, 'gi');
            const { latitude, longitude } = place;
            const cityName = place.city.replace(regex, `<span class="cityhighlight">${this.state.input}</span>`)
            const stateName = place.state.replace(regex, `<span class="cityhighlight">${this.state.input}</span>`);
            return `
                <li class="citysuggestionitem">
                    <span class="cityname">${cityName}, ${stateName}<span class="citycoords">${latitude},${longitude}</span></span>
                </li>
            `
        }).join('');
        suggestions.innerHTML = html;

        const context = this;
        $('.citysuggestionitem').on('click', function() {
            const coords = $(this).find($('.citycoords')).text();
            context.props.handleSuggestionClick(coords);
        })
        // hide suggestions when clicking elsewhere
        const hideSuggestions = () => suggestions.classList.remove('show');
        $('body').on('click', ':not(.citysuggestions, .citysuggestionitem, .cityname)', hideSuggestions);
    }

    render() {
        if (this.state.input) this.displayMatches();
        return (
            <div id="weathersearchbar">
                <form id="weathersearchform" >
                    <input type="search" id="weathersearch" onKeyUp={this.findMatches} placeholder="Search" autoComplete="off"></input>
                </form>
                <ul className="citysuggestions"></ul>
            </div>
        )
    }
}