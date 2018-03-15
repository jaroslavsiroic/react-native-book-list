import React, { Component } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
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
    paddingBottom: 10,
    width: 300
  }
});

class Card extends Component {

  render() {
    const { likes, webformatURL, favorites, tags } = this.props;
    return (
      <View style={style.card}>
        <Image style={style.thumbnail} source={{uri: webformatURL}} />
        <Text style={style.text}>{`Likes: ${likes} Fav: ${favorites}`}</Text>
        <Text style={style.text}>{`Tags: ${tags}`}</Text>
      </View>
    );
  }
}

module.exports = Card;

