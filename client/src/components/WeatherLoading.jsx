import React from 'react';

export default class WeatherLoading extends React.Component {
    render() {
        return (
            <div id="weatherloading">
                <img className="loading" src="loading.gif" alt="loading..." />
            </div>
        )
    }
}