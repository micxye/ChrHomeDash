import React from 'react';
import DashboardHome from './DashboardHome.jsx'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div id="dashboardcontainer">
                <DashboardHome />
                <div id="navbar">

                </div>
            </div>
        )
    }
}