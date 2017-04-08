import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text, TextInput, Alert, Switch } from 'react-native';
import Button from '../components/Button';
import { deleteBook, editBook } from '../actions/bookActions';
import { connect } from 'react-redux';

class BookView extends Component {
  static navigationOptions = {
    title: 'Book options',
  }

  constructor(props) {
    super(props);

    this.saveEdit = this.saveEdit.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.state = {
      editMode: false,
      author: '',
      title: '',
      tempAuthor: '',
      tempTitle: '',
      alreadyRead: false
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({alreadyRead: params.alreadyRead, title: params.title, author: params.author, tempTitle: params.title, tempAuthor: params.author});
  }

  saveEdit() {
    const { tempTitle, tempAuthor, alreadyRead } = this.state;
    const { id } = this.props.navigation.state.params;

    if (tempTitle === '' || tempAuthor === '') {
      Alert.alert('Input fields are empty! :(');
    } else {
      this.setState({title: tempTitle, author: tempAuthor, editMode: false});

      const book = {
        title: tempTitle,
        author: tempAuthor,
        id: id,
        alreadyRead: alreadyRead
      };
      this.props.editBook(book);
    }
  }

  deleteBook() {
    const { goBack } = this.props.navigation;
    const { id } = this.props.navigation.state.params;
    this.props.deleteBook(id);
    goBack();
  }

  render() {
    const { title, author, tempAuthor, tempTitle, alreadyRead } = this.state;
    const info = alreadyRead ? <Text style={{margin: 10, fontSize: 19, color: 'green'}}>You have read this book</Text> :
      <Text style={{margin: 10, fontSize: 19, color: 'red'}}>Book not read yet</Text>

    if (this.state.editMode) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              value={tempTitle}
              style={{height: 40, width: 300}}
              placeholder='Book title here!'
              onChangeText={(text) => this.setState({tempTitle: text})} />
            <TextInput
              value={tempAuthor}
              style={{height: 40, width: 300}}
              placeholder='Book author here!'
              onChangeText={(text) => this.setState({tempAuthor: text})} />
          </View>
          <View style={{flexDirection: 'row', margin: 20}}>
            <Switch
              onValueChange={(value) => this.setState({alreadyRead: value})}
              style={{marginRight: 10}}
              value={this.state.alreadyRead} />
            <Text>Book is already read?</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button backgroundColor='green' width={100} text='Save' onClick={this.saveEdit}/>
            <Button backgroundColor='gray' width={100} text='Cancel' onClick={()=>{this.setState({tempTitle: title, tempAuthor: author, editMode: false})}}/>
          </View>
        </View>);
    } else {
      return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{alignItems: 'center', justifyContent: 'center' }}>
          {info}
          <Text style={{margin: 10, fontSize: 23, fontWeight: 'bold'}}>{title}</Text>
          <Text style={{margin: 10, fontSize: 19}} >{author}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button backgroundColor='green' width={100} text='Edit' onClick={() => this.setState({editMode: true})}/>
          <Button backgroundColor='red' width={100} text='Delete' onClick={this.deleteBook}/>
        </View>
      </View> );
    }
  }
}

export default connect(state => ({}),
  (dispatch) => bindActionCreators({
      deleteBook: deleteBook,
      editBook: editBook
    }, dispatch)
)(BookView);