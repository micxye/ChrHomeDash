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
            const milli = now.getMilliseconds(),
                sec = now.getSeconds(),
                min = now.getMinutes(),
                hou = now.getHours(),
                mo = now.getMonth(),
                dy = now.getDate(),
                yr = now.getFullYear();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const tags = ["mon", "d", "y", "h", "m", "s", "mi"],
                corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
            for (var i = 0; i < tags.length; i++) {
                document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
            }

            // CSS clock
            const secondHand = document.querySelector('.second-hand');
            const minsHand = document.querySelector('.min-hand');
            const hourHand = document.querySelector('.hour-hand');

            const seconds = now.getSeconds();
            const secondsDegrees = ((seconds / 60) * 360) + 90;
            secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

            const mins = now.getMinutes();
            const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
            minsHand.style.transform = `rotate(${minsDegrees}deg)`;

            const hour = now.getHours();
            const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
            hourHand.style.transform = `rotate(${hourDegrees}deg)`;  
        }
        updateClock();
        window.setInterval(updateClock, 1);
    }

    componentDidMount() {
        this.initClock()
    }
    
    render() {
        return (
            <div id="datetimecontainer">
                <div id="clockcontainer">
                    <div className="clock">
                        <div className="clock-face">
                            <div className="hand hour-hand"></div>
                            <div className="hand min-hand"></div>
                            <div className="hand second-hand"></div>
                        </div>
                    </div>
                </div>
                <div id="datetime">
                    <a id="mon">January</a>
                    <a id="d">1</a>,
                    <a id="y">0</a><br />
                    <a id="h">12</a>:
                    <a id="m">00</a>:
                    <a id="s">00</a>
                    <a id="mi">000</a>
                </div>
            </div>
        )
    }
}




