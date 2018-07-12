import React from 'react';

export default class WeatherLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="w3-animate-opacity" id="weatherloading">
            </div>
        )
    }
}