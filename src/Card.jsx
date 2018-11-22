import React, { Component } from 'react';
import imgCat from './assets/images/captura.png';

class Card extends Component {
  render() {
    return <div className="card">
    <div className="card-image">
      <img src={imgCat} alt="cat" className="img-responsive"/>
    </div>
    <div className="card-header">
      <div className="card-title h5">{this.props.title}</div>
      <div className="card-subtitle text-gray">{this.props.subtitle}</div>
    </div>
    <div className="card-body">
      {this.props.content}}
    </div>
    <div className="card-footer">
      <button className="btn btn-primary">...</button>
    </div>
  </div>;
  }
}

export default Card;
