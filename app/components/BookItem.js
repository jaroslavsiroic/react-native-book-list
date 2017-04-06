import React, { Component, PropTypes } from 'react';
import {Text, TouchableOpacity, StyleSheet } from 'react-native';

const style = StyleSheet.create({
  item: {
    padding: 10,
    margin: 3,
    borderBottomColor: '#000033',
    borderBottomWidth: 1,
  }
});

class BookItem extends Component {

  render() {
    const { author, title, id, alreadyRead, onClick} = this.props;
    const color = alreadyRead ? 'green' : 'black';
    return (
      <TouchableOpacity style={style.item} onPress={onClick}>
        <Text style={{fontWeight: 'bold', color: color}}>{title}</Text>
        <Text>{author}</Text>
      </TouchableOpacity>
    );
  }
}

module.exports = BookItem;

