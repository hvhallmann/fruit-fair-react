import React, { Component } from 'react';
// import logo from './logo.svg';
import Cards from "./Cards";
import staticDb from "./db/db.js";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.db = staticDb;
    this.state = {
      cardsDataProvider: []
    }
  }
  componentDidMount() {
    this.identifyCards(this.db);
  }
  identifyCards(database) {
    if(!database) return;
    //reverse db
    const listCards = [];
    database.reverse().forEach(element => {
      const itemsToIterate = element.season.reverse();
      //iterate over season backwards
      for (var i = 0, len = itemsToIterate.length; i < len; i++) {
        var item = itemsToIterate[i];
        if (item === 'Forte' && (new Date()).getMonth() === i ) {
          // console.log('hj esta bom para', element.name);
          listCards.push(element.name);
        }
      }
    });
    this.setState({cardsDataProvider: listCards});
    console.log('carregado co ', listCards);
  }
  render() {
    return (
      <div className="App">
        <section>
          <h1>Feira Fruta</h1>
          <h2>Hoje</h2>
          <h3>A sugestao é levar2 os seguintes produtos:</h3>
          <Cards dataProvider={this.state.cardsDataProvider} />
        </section>
        <button className="btn">default button</button>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
