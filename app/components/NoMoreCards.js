import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

class NoMoreCards extends Component {

  render() {
    return (
      <View style={style.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
}

module.exports = NoMoreCards;

