import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { printTime, timePassed } from './time-helpers';

export default class App extends Component {
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
    return (
      <View style={styles.container}>
        <Text style={styles.header}> Work Time ⏰</Text>
        <AddEntry
            onEntryAdd={(entry) =>
                this.saveNewEntry(entry)
            }
        />
        <EntryList
            entries={this.state.entries}
            onDelete={id => this.deleteEntry(id)}
        />
      </View>
    );
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
        return (<View
            style={styles.addEntry}
        >
            <TextInput
                value={this.state.name}
                placeholder="What are you working on"
                onChange={(e) => this.setState({ name: e.nativeEvent.text })}
                style={styles.input}
            />
            {this.state.startTime ? (<TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={() => this.saveEntry()}
            >
                <Text style={styles.btnText}>Stop</Text>
            </TouchableOpacity>) : (<TouchableOpacity
                style={[styles.button, styles.green]}
                onPress={() => this.setState({ startTime: new Date() })}
            >
                <Text style={styles.btnText}>Start</Text>
            </TouchableOpacity>)}
        </View>);
    }
}

class EntryList extends React.Component {
    render() {
        return (<View>
            {Object.keys(this.props.entries).map((id) => {
                const entry = this.props.entries[id];
                return <View key={id} style={styles.entryRow}>
                    <Text style={[styles.text, styles.entry]}>
                        <Text>{entry.name + ' '}</Text>
                        <Text style={styles.bold}>
                            {timePassed(entry.startTime, entry.endTime) + ' '}
                        </Text>
                        <Text style={styles.small}>
                            ({printTime(entry.startTime)}
                            {" - "}
                            {printTime(entry.endTime)})
                        </Text>
                    </Text>
                    <TouchableOpacity
                        onPress={() => this.props.onDelete(id)}
                        style={[styles.button, styles.red]}
                    >
                        <Text style={styles.btnText}>DEL</Text>
                    </TouchableOpacity>
                </View>
            })}
        </View>);
    }
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        height: 40,
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 5,
        marginRight: 10,
    },
    addEntry: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
    },
    button: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        backgroundColor: 'green',
    },
    entryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    btnText: {
        color: '#fff',
    },
    red: {
        backgroundColor: 'red',
    },
    entry: {
        flex: 1,
        marginRight: 10,
    },
    text: {
        fontSize: 14,
        color: '#333',
    },
    bold: {
        fontWeight: 'bold',
    },
    small: {
        fontSize: 11,
    }
});
