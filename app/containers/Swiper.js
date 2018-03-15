'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SwipeCards from 'react-native-swipe-cards';
import Card from '../components/Card';
import NoMoreCards from '../components/NoMoreCards';
import { addImage } from '../actions/imageDataActions';
import { getFromPixaBay } from '../actions/fetchActions';

class Swiper extends Component {
  static navigationOptions = {
    title: 'Swiper',
  };

  constructor(props) {
    super(props);
    this.handleYup = this.handleYup.bind(this);  }

  componentWillMount () {
    this.props.getFromPixaBay(this.props.navigation.state.params.input);
  }

  handleYup (card) {
    this.props.addImage({image: card.webformatURL, id: card.id});
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

        handleYup={this.handleYup} />
    );
  }
}

module.exports = connect(state => ({
    images: state.communication.image_cache
}),(dispatch) => bindActionCreators({
      addImage: addImage,
      getFromPixaBay: getFromPixaBay
}, dispatch))(Swiper);


