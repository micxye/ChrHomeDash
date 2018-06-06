import React from 'react';
import DateTime from './DateTime.jsx'

export default class DashboardHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="dashboardhome">
                <div id="datetimecontainer">
                    <DateTime />
                </div>
            </div>
        )
    }
}