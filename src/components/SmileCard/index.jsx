import React, {Component} from 'react';

class SmileCard extends Component {

    constructor(props) {
        super(props);

        this.handleVote = this.handleVote.bind(this);
    }

    handleVote() {
        this.props.onVote(this.props.smile.id);
    }

    render() {
        const smile = this.props.smile;

        return (
            <div className="card text-center">
                <div className="card-body">
                    <div>{smile.symbol}</div>
                    <p className="card-text">Голосів: {smile.votes}</p>
                    <button className="btn btn-primary btn-sm" onClick={this.handleVote}>
                        Голосувати
                    </button>
                </div>
            </div>
        );
    }
}

export default SmileCard;
