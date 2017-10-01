import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text, ListView, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { connect } from 'react-redux';

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
      dataSource: ds.cloneWithRows([])
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ListView
          style={{width: 350}}
          dataSource={this.state.dataSource}
          renderRow={(data) => {
            return (
              <View style={style.item}>
                <Image style={{width: 300, height: 300}} />
              </View>)
          }} />
      </View>
    );
  }
}

export default List;