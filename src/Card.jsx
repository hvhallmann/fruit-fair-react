import React, { Component } from 'react';
import imgCat from './assets/images/uva-pera.png';
import cardss from './Card.css';

// A imagem tem 11,3cm width por 8,51cm d height
// com resolution de 7,87 pixel/cml
// 18KB
class Card extends Component {
  render() {
    return <div className="card-size">
    <div className="card-image img-align">
      <img src={imgCat} alt="cat" className="img-responsive"/>
    </div>
    <div className="card-footer">
      <div className="card-title h7">{this.props.title}</div>
    </div>
  </div>;
  }
}

export default Card;
