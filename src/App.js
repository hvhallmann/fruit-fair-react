import React, { Component } from 'react';
import staticDb from "./db/db.js";
import Card from './Card';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.db = staticDb;
    this.state = {
      greenCardsDataProvider: [],
      greenCardsSecTierDataProvider: [],
      greenCardsThirdTierDataProvider: [],
      yellowCardsDataProvider: []
    }
  }
  componentDidMount() {
    this.identifyCards(this.db);
  }
  getPreviousMonth(currentMonth) {
    let previousMouth = currentMonth - 1;
    if (previousMouth === -1) previousMouth = 0;
    return previousMouth;
  }
  getNextMonth(currentMonth) {
    let nextMounth = currentMonth + 1;
    if (nextMounth === 12) nextMounth = 0;
    return nextMounth;
  }
  identifyCards(database) {
    if(!database) return;
    //reverse db
    const firstListCards = [];
    let secListCards = [];
    let thirdListCards = [];
    const yellowFirstListCards = [];
    let yellowSecListCards = [];
    let yellowThirdListCards = [];
    database.reverse().forEach(element => {
      const itemsToIterate = element.season;

      for (var monthIter = 0, len = itemsToIterate.length; monthIter < len; monthIter++) {
        var item = itemsToIterate[monthIter];
        const currentMonth = new Date().getMonth();
        if (item === 'Forte' && (currentMonth === monthIter )) {
          firstListCards.push(element);
        }
        // else if (item === 'Forte' && (this.getPreviousMonth(currentMonth) === monthIter )) {
        //   secListCards.push(element);
        // }  else if (item === 'Forte' && (this.getNextMonth(currentMonth) === monthIter )) {
        //   thirdListCards.push(element);
        // }
        // yellow cases
        if (item === 'Medio' && (currentMonth === monthIter )) {
          yellowFirstListCards.push(element);
        } else if (item === 'Medio' && (this.getPreviousMonth(currentMonth) === monthIter )) {
          yellowSecListCards.push(element);
        }  else if (item === 'Medio' && (this.getNextMonth(currentMonth) === monthIter )) {
          yellowThirdListCards.push(element);
        }
      }
    });
    secListCards = secListCards.filter(val => !firstListCards.includes(val));
    thirdListCards = thirdListCards.filter(val => !firstListCards.includes(val));
    thirdListCards.concat(thirdListCards.filter(val => !secListCards.includes(val)));
    
    this.setState({greenCardsDataProvider: firstListCards});
    this.setState({greenCardsSecTierDataProvider: secListCards});
    this.setState({greenCardsThirdTierDataProvider: thirdListCards});
  }
  render() {
    const listItems = this.state.greenCardsDataProvider && this.state.greenCardsDataProvider.map((elem, index) =>
      <Card key={elem.name + index} className="column col-xs-3" title={elem.name} image={elem.key} />
    );
    return (
      <div className="App">
        <section>
          <h1>Feira Fruta</h1>
          <h2>Hoje</h2>
          <h3>A sugestao é levar os seguintes produtos:</h3>
          <div className="container grid-xs">
            <div className="columns">
              {listItems}
            </div>
          </div>
          {/* <Cards dataProvider={this.state.greenCardsDataProvider} /> */}
        </section>
        {/* <section>
          <h3>Estes Devem estar bons tambem do mes passado:</h3>
          <Cards dataProvider={this.state.greenCardsSecTierDataProvider} />
        </section>
        <section>
          <h3>Estes estao saindo do forno para o proximo mes!</h3>
          <Cards dataProvider={this.state.greenCardsThirdTierDataProvider} />
        </section>
        <section>
          <h3>Estes outros produtos voce ainda consegue encontrar:</h3>
        </section> */}
      </div>
    );
  }
}

export default App;
