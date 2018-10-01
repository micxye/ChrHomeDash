import React from 'react';

export default class TweetErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            console.log(this.props.children)
            return <span className="tweeterror">could not render tweet</span>;
        }
        return this.props.children;
    }
}