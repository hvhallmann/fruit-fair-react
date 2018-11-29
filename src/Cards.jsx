import React, { Component } from 'react';
import Card from './Card';

class Cards extends Component {
  constructor(props) {
    super(props);
    // const { name, ...other } = props.cardsDataProvider
    this.state = {
      data: props.cardsDataProvider
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.dataProvider });
  }
  
  render() {
    const listItems = this.props && this.props.map((elem, index) =>
      <Card key={elem.key} className="column col-xs-3" image={elem.image} title={elem.name} />);
    return (
      <div className="container grid-xs">
        <div className="columns">
          {...this.props}
        </div>
      </div>
    );
  }
}

export default Cards;
