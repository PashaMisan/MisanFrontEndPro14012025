import React, {Component} from 'react';
import SMILES from "./data/smiles.js";
import SmileCard from "./components/SmileCard";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            smiles: SMILES,
            winner: null
        };
    }

    handleVote = (id) => {
        const smiles = this.state.smiles.map(smile => {
            if (smile.id === id) smile.votes++;

            return smile;
        });

        this.setState({smiles});
    };

    showResults = () => {
        const maxVotes = Math.max(...this.state.smiles.map(smile => smile.votes));
        const winner = this.state.smiles.find(smile => smile.votes === maxVotes);

        this.setState({winner});
    };

    render() {
        return (
            <div className="container text-center mt-5">
                <h2 className="mb-4">Голосування за кращий смайл</h2>

                <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
                    {this.state.smiles.map(smile => (
                        <SmileCard key={smile.id} smile={smile} onVote={this.handleVote}/>
                    ))}
                </div>

                <button className="btn btn-warning" onClick={this.showResults}>
                    Show Results
                </button>

                {this.state.winner && (
                    <div className="alert alert-success mt-4" role="alert">
                        Переможець: <strong>{this.state.winner.symbol} {this.state.winner.name}</strong> — {this.state.winner.votes} голосів!
                    </div>
                )}
            </div>
        );
    }
}

export default App;
