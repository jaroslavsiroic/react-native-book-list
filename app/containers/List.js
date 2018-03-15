import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text, ListView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { deleteImage } from '../actions/imageDataActions';

const style = StyleSheet.create({
  item: {
    padding: 10,
    margin: 3,
    borderBottomColor: '#000033',
    borderBottomWidth: 1,
  }
});

class List extends Component {
  static navigationOptions = {
    title: 'FavList',
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      currentText: ''
    };
  }

  componentWillMount() {

  }

  componentWillReceiveProps(props) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.images)
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { currentText } = this.state;
    console.log(this.state);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
              value={currentText}
              style={{height: 40, width: 300}}
              placeholder='Type something here..'
              onChangeText={(text) => this.setState({currentText: text})} />
        <Button text='Search' onClick={() => navigate('Swiper', {input: currentText})} />
        <ListView
          style={{width: 350}}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(data) => {
            return (
              <View key={data.id} style={style.item}>
                <Image style={{width: 300, height: 300}} source={{uri: data.image}} />
                <Button backgroundColor='red' text='Delete' onClick={() => this.props.deleteImage(data.id)} />
              </View>)
          }} />
      </View>
    );
  }
}

module.exports = connect(state => ({
    images: state.data.images
}),(dispatch) => bindActionCreators({
    deleteImage: deleteImage
}, dispatch))(List);