import React, { Component } from 'react';
import staticDb from "./db/db.js";
import Card from './Card';
import './App.css';

// you can read more on
// https://www.smashingmagazine.com/2018/11/guide-pwa-progressive-web-applications/

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
  uniqueArray(arrArg) {
    return arrArg.filter(function(elem, pos,arr) {
      return arr.indexOf(elem) === pos;
    });
  };
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
          continue;
        } 
        else if (item === 'Forte' && (this.getPreviousMonth(currentMonth) === monthIter )) {
          secListCards.push(element);
        }  
        else if (item === 'Forte' && (this.getNextMonth(currentMonth) === monthIter )) {
          // if (firstListCards.findIndex(el => el.name === element.name) === -1 &&
          // secListCards.findIndex(el => el.name === element.name) === -1) {
            console.log('here with', element.name);
            thirdListCards.push(element);
          // }
        }
        // yellow cases
        if (item === 'Medio' && (currentMonth === monthIter )) {
          // console.log('here with', element.name);
          yellowFirstListCards.push(element);
        } else if (item === 'Medio' && (this.getPreviousMonth(currentMonth) === monthIter )) {
          // console.log('here with', element.name);
          yellowSecListCards.push(element);
        }  else if (item === 'Medio' && (this.getNextMonth(currentMonth) === monthIter )) {
          // console.log('here with', element.name);
          yellowThirdListCards.push(element);
        }
      }
    });
    secListCards = secListCards.filter(val => !firstListCards.includes(val));
    // thirdListCards = thirdListCards.filter(val => !firstListCards.includes(val));
    // thirdListCards.concat(thirdListCards.filter(val => !secListCards.includes(val)));
    // thirdListCards = this.uniqueArray(thirdListCards.concat(firstListCards));
    // thirdListCards = this.uniqueArray(thirdListCards.concat(secListCards));
    
    this.setState({greenCardsDataProvider: firstListCards});
    this.setState({greenCardsSecTierDataProvider: secListCards});
    this.setState({greenCardsThirdTierDataProvider: thirdListCards});
  }
  render() {
    const listItems = this.state.greenCardsDataProvider && this.state.greenCardsDataProvider.map((elem, index) =>
      <Card key={elem.name + index} className="column col-xs-3" title={elem.name} image={elem.key} />
    );
    const secListItems = this.state.greenCardsSecTierDataProvider && this.state.greenCardsSecTierDataProvider.map((elem, index) =>
      <Card key={elem.name + index} className="column col-xs-3" title={elem.name} image={elem.key} />
    );
    const thirdListItems = this.state.greenCardsThirdTierDataProvider && this.state.greenCardsThirdTierDataProvider.map((elem, index) =>
      <Card key={elem.name + index} className="column col-xs-3" title={elem.name} image={elem.key} />
    );
    //https://stackoverflow.com/questions/38268573/how-to-print-each-letter-in-different-color-in-css-html
    return (
      <div className="App">
        <section>
          <h1>Feira Fruta</h1>
          {/* <p>
            <span style={color: 'blue'}>G</span>
            <span style='color: red'>o</span>
            <span style='color: yellow'>o</span>
            <span style='color: blue'>g</span>
            <span style='color: green'>l</span>
            <span style='color: red'>e</span>
          </p> */}
          <h2>Hoje</h2>
          <h3>A sugestao é levar os seguintes produtos:</h3>
          <div className="container grid-xs">
            <div className="columns-custom">
              {listItems}
            </div>
          </div>
        </section>
        <section>
          <h3>Bons do mes anterior:</h3>
          <div className="container grid-xs">
            <div className="columns-custom">
              {secListItems}
            </div>
          </div>
        </section>
        <section>
          <h3>Saindo do forno para o proximo mes!</h3>
          <div className="container grid-xs">
            <div className="columns-custom">
              {thirdListItems}
            </div>
          </div>
        </section>
        {/*
        <section>
          <h3>Estes outros produtos voce ainda consegue encontrar:</h3>
        </section> */}
      </div>
    );
  }
}

export default App;
