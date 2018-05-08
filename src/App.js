import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import icon from './superup-logo.png';
import TableComponent from './components/table/table.component';



class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={icon} className="App-logo" alt="logo" />
          <h1 className="App-title">Salary Application</h1>
        </header>

          <TableComponent/>


      </div>
    );
  }
}

export default App;
