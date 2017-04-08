'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { StyleSheet, Text, View, Image } from 'react-native';
import BookItem from '../components/BookItem';
import Button from '../components/Button';
import { connect } from 'react-redux';

import SwipeCards from 'react-native-swipe-cards';

// class Homepage extends Component {
//   constructor(props) {
//     super(props);
//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {
//       dataSource: ds.cloneWithRows([])
//     };
//   }

//   componentWillMount() {

//   }

//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>

//       </View>
//     );
//   }
// }

// export default connect(state => ({}),
//   (dispatch) => ({})
// )(Homepage);


let Card = React.createClass({
  render() {
    const { category } = this.props;
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.link}} />
        <Text style={styles.text}>{`${category}`}?</Text>
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

// const Cards = [
//   {name: '1', image: 'http://i.telegraph.co.uk/multimedia/archive/03046/hipster-tash_3046941b.jpg'},
//   {name: '2', image: 'http://www.sickchirpse.com/wp-content/uploads/2016/08/Hipster-1.jpg'},
//   {name: '3', image: 'http://media.giphy.com/media/LkLL0HJerdXMI/giphy.gif'},
//   {name: '4', image: 'http://media.giphy.com/media/fFBmUMzFL5zRS/giphy.gif'},
//   {name: '5', image: 'http://media.giphy.com/media/oDLDbBgf0dkis/giphy.gif'},
//   {name: '6', image: 'http://media.giphy.com/media/7r4g8V2UkBUcw/giphy.gif'},
//   {name: '7', image: 'http://media.giphy.com/media/K6Q7ZCdLy8pCE/giphy.gif'},
//   {name: '8', image: 'http://media.giphy.com/media/hEwST9KM0UGti/giphy.gif'},
//   {name: '9', image: 'http://media.giphy.com/media/3oEduJbDtIuA2VrtS0/giphy.gif'},
// ]

export default React.createClass({
  getInitialState() {
    return {
      cards: [],
      outOfCards: false
    }
  },
  componentWillMount () {
    const { category } = this.props.navigation.state.params;
    fetch('https://tinder-for-dataset-maxleaf.c9users.io/data?category='+category)
      .then((response) => {
          if (response.status >= 400) {
              console.log(response);
          }
          try {
              return response.json();
          } catch(e) {
              console.log(e);
          }
      })
      .then((data) => {
          this.setState({cards: this.shuffle(data)})
      });
  },
  handleYup (card) {
    const { category } = this.props.navigation.state.params;
    this.sendReq({id: card.id, isHipster: true, category: category})
  },
  handleNope (card) {
    const { category } = this.props.navigation.state.params;
    this.sendReq({id: card.id, isHipster: false, category: category})
  },
  sendReq (data) {
    const { category } = this.props.navigation.state.params;

    const req = {
      credentials: 'include',
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(data)
    };
    fetch('https://tinder-for-dataset-maxleaf.c9users.io/update', req)
    .then((response) => {
        if (response.status >= 400) {
            console.log(response);
        }
        try {
            return response.json();
        } catch(e) {
            console.log(e);
        }
    });
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
    }

  },
  shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  },
  render() {
    const { category } = this.props.navigation.state.params;
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} category={category} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved} />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})