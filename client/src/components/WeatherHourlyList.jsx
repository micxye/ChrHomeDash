import React from 'react';
import WeatherHourlyEntry from './WeatherHourlyEntry.jsx';

export default class WeatherHourlyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentHour: null }
    }

    componentDidMount() {
        const now = new Date(Number(`${this.props.weatherHourly.data[0].time}000`));
        this.setState({ currentHour: now.getHours() });
        this.initializeClickAndDrag();
    }


    initializeClickAndDrag() {
        const slider = document.querySelector('#weatherhourlyscrollbox');
        let isDown = false;
        let startX;
        let scrollLeft;
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.classList.add('grabscrollactive');
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('grabscrollactive');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('grabscrollactive');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return; 
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    render() {
        return (
            <div className="dropdown" id="weatherhourlycontainer">
                <div id="weatherhourlysummary">{this.props.weatherHourly.summary}</div>
                <div id="weatherhourlyscrollbox">
                    {this.props.weatherHourly.data.map((hour, i) => {
                        if (i !== 0 && i % 2 === 0) {
                            return <WeatherHourlyEntry key={i} id={i} weather={hour} time={(this.state.currentHour + i) % 24}/>
                        }
                    })}
                </div>
            </div>
        )
    }
}