import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text, TextInput, Alert } from 'react-native';
import Button from '../components/Button';
import { addBook } from '../actions/bookActions';
import { connect } from 'react-redux';

class AddBook extends Component {
  static navigationOptions = {
    title: 'Add new Book',
  }

  constructor(props) {
    super(props);

    this.addBook = this.addBook.bind(this);

    this.state = {
      tempAuthor: '',
      tempTitle: '',
    };
  }

  addBook() {
    const { tempTitle, tempAuthor } = this.state;
    const { goBack } = this.props.navigation;

    if (tempTitle === '' || tempAuthor === '') {
      Alert.alert('Input fields are empty! :(');
    } else {
      const book = {
        title: tempTitle,
        author: tempAuthor,
      };
      this.props.addBook(book);
      goBack();
    }
  }

  render() {
    const { title, author, tempAuthor, tempTitle } = this.state;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            value={tempTitle}
            style={{height: 40, width: 300}}
            placeholder="Book title here!"
            onChangeText={(text) => this.setState({tempTitle: text})} />
          <TextInput
            value={tempAuthor}
            style={{height: 40, width: 300}}
            placeholder="Book author here!"
            onChangeText={(text) => this.setState({tempAuthor: text})} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button backgroundColor='green' width={200} text='Save' onClick={this.addBook}/>
        </View>
      </View>
    );
  }
}

export default connect(state => ({}),
  (dispatch) => bindActionCreators({
      addBook: addBook
    }, dispatch)
)(AddBook);