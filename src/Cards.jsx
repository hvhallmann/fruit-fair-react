import React, { Component } from 'react';
import Card from './Card';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.cardsDataProvider
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.dataProvider });
  }
  
  render() {
    const listItems = this.state.data && this.state.data.map((name, index) =>
      <Card key={name + index} className="column col-3" title={name} content="Hello" />);
    return (
      <div className="container">
        <div className="columns">
          {listItems}
        </div>
      </div>
    );
  }
}

export default Cards;
