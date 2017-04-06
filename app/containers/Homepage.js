import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text, ListView } from 'react-native';
import BookItem from '../components/BookItem';
import Button from '../components/Button';
import { connect } from 'react-redux';

class Homepage extends Component {
  static navigationOptions = {
    title: 'My books',
  }
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.books)
    });
  }

  componentWillReceiveProps(newProps) {
    let books = newProps.books;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(books)
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button text='Add new book' onClick={()=> navigate('AddBook')}/>
        <ListView
          style={{width: 350}}
          dataSource={this.state.dataSource}
          renderRow={(book) => <BookItem {...book} onClick={()=> navigate('BookView', {...book})} />} />
      </View>
    );
  }
}

export default connect(state => ({
    books: state.data.books
  }),
  (dispatch) => ({})
)(Homepage);