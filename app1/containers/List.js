import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text, ListView, TouchableOpacity, StyleSheet } from 'react-native';
import BookItem from '../components/BookItem';
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
    title: 'List',
  }
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['hipster', 'potato', 'banana'])
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
              <TouchableOpacity style={style.item} onPress={()=> navigate('Cards', {category: data})}>
                <Text style={{fontSize: 20, margin: 10}}>{data}</Text>
              </TouchableOpacity>)
          }} />
      </View>
    );
  }
}

export default List;