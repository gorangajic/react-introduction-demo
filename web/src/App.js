import React, { Component } from 'react';
import { printTime, timePassed } from './time-helpers';


class App extends Component {
    constructor(props) {
        super(props);
        this.id = 1;
        this.state = {
            entries: {},
        };
    }
    saveNewEntry(entry) {
        const entries = {
            ...this.state.entries
        };
        entries[this.id] = entry;
        this.id++;
        this.setState({ entries });
    }
    deleteEntry(id) {
        const entries = {
            ...this.state.entries
        };
        delete entries[id];
        this.setState({ entries: entries });
    }
    render() {
        return (<div className="container">
            <h1>Work Time ⏰</h1>
            <AddEntry
                onEntryAdd={(entry) =>
                    this.saveNewEntry(entry)
                }
            />
            <EntryList
                entries={this.state.entries}
                onDelete={(id) => this.deleteEntry(id)}
            />
        </div>
        )
    }
}

class EntryList extends React.Component {
    render() {
        return (<ul>
            {Object.keys(this.props.entries).map(id => {
                const entry = this.props.entries[id];
                return (<li key={id}>
                    {entry.name + ' '}
                    <strong>
                        {timePassed(entry.startTime, entry.endTime)}
                    </strong>
                    <small>
                        ({printTime(entry.startTime)}
                        {" - "}
                        {printTime(entry.endTime)})
                    </small>
                    <div
                        onClick={() => this.props.onDelete(id)}
                        className="btn btn-danger"
                    >
                        DEL
                    </div>
                </li>);
            })}
        </ul>);
    }
}

class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            startTime: null,
        };
    }
    saveEntry() {
        this.props.onEntryAdd({
            name: this.state.name,
            startTime: this.state.startTime,
            endTime: new Date(),
        });
        this.setState({
            name: '',
            startTime: null,
        });
    }
    render() {
        return (<div className="form">
            <input
                value={this.state.name}
                type="text"
                placeholder="What are you working on"
                onChange={(e) => this.setState({ name: e.target.value })}
            />
            {this.state.startTime ? <div
                className="btn btn-danger"
                onClick={() => this.saveEntry()}
            >
                Stop
            </div> : <div
                onClick={() => this.setState({ startTime: new Date() })}
                className="btn btn-success"
            >Start</div>}

        </div>);
    }
}

export default App;
