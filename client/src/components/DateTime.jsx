import React from 'react';

Number.prototype.pad = function (n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

export default class DateTime extends React.Component {
    constructor(props){
        super(props)
    }

    initClock() {
        const updateClock = () => {
            const now = new Date();
            const sec = now.getSeconds(),
                  min = now.getMinutes(),
                  hou = now.getHours(),
                  tags = ["h", "m", "s"],
                  corr = [hou.pad(2), min.pad(2), sec.pad(2)];
            // Digital clock
            for (var i = 0; i < tags.length; i++) {
                document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
            }

            // CSS traditional clock
            const secondHand = document.querySelector('.second-hand');
            const minsHand = document.querySelector('.min-hand');
            const hourHand = document.querySelector('.hour-hand');

            const secondsDegrees = ((sec / 60) * 360) + 90;
            sec === 0 ? secondHand.style.transition = '0s' : secondHand.style.transition = 'all 0.05s';
            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

            const minsDegrees = ((min / 60) * 360) + ((sec / 60) * 6) + 90;
            min === 0 ? minsHand.style.transition = '0s' : minsHand.style.transition = 'all 0.05s';
            minsHand.style.transform = `rotate(${minsDegrees}deg)`;

            const hourDegrees = ((hou / 12) * 360) + ((min / 60) * 30) + 90;
            hourHand.style.transform = `rotate(${hourDegrees}deg)`;  
        }
        updateClock();
        window.setInterval(updateClock, 1000);
    }

    componentDidMount() {
        this.initClock()
    }
    
    render() {
        return (
            <div id="timecontainer">
                <div id="clockcontainer">
                    <div className="clock">
                        <div className="clock-face">
                            <div className="hand hour-hand"></div>
                            <div className="hand min-hand"></div>
                            <div className="hand second-hand"></div>
                        </div>
                    </div>
                </div>
                <div id="time">
                    <a id="h">12</a>:
                    <a id="m">00</a>:
                    <a id="s">00</a>
                </div>
            </div>
        )
    }
}




