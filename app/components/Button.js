import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, onClick, width, height, padding, backgroundColor, alignItems, justifyContent, margin, color, fontSize } = this.props;

    const style = StyleSheet.create({
      button: {
        width: width,
        height: height,
        padding: padding,
        backgroundColor: backgroundColor,
        alignItems: alignItems,
        justifyContent: justifyContent,
        margin: margin,
      },
      text: {
        color: color,
        fontSize: fontSize
      }
    });
    return (
      <TouchableOpacity onPress={onClick} style={style.button}>
        <Text style={style.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
    text: 'Button',
    width: 300,
    height: 40,
    padding: 10,
    backgroundColor: '#5FB404',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    color: 'white',
    fontSize: 18
};

module.exports = Button;

