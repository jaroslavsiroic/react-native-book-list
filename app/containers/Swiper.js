'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SwipeCards from 'react-native-swipe-cards';
import Card from '../components/Card';
import NoMoreCards from '../components/NoMoreCards';
import { addImage } from '../actions/imageDataActions';
import { getFromPixaBay } from '../actions/fetchActions';

import Cards from '../links_celebrity.json';

class Swiper extends Component {
  static navigationOptions = {
    title: 'Swiper',
  };

  constructor(props) {
    super(props);
    this.handleYup = this.handleYup.bind(this);
    this.handleNope = this.handleNope.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.cardRemoved = this.cardRemoved.bind(this);
  }

  componentWillMount () {
    this.props.getFromPixaBay(); // error here
    // console.log(this.props);
  }

  handleYup (card) {
  }

  handleNope (card) {
  }

  cardRemoved (index) {
  }

  shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  render() {
    return (
      <SwipeCards
        cards={this.props.images}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}
        stack={true}
        smoothTransition={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved} />
    );
  }
}

module.exports = connect(state => ({
    images: state.communication.image_cache
}),(dispatch) => bindActionCreators({
      addImage: addImage,
      getFromPixaBay: getFromPixaBay
}))(Swiper);


