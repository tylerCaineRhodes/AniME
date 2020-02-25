import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import {Banner, Button} from 'react-native-paper';
import Axios from 'axios';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      search: '',
      data: [],
      savedList: [],
      visible: true

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // Axios.get( `https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
  }

  handleFuzzySearch

  handleChange(search){
    console.log(search)
    this.setState({search}, () => {
      Axios.get( `https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
      .then((response) => {
        console.log('here is the response --->', response.data)
        this.setState({
          data: response.data
        })
      })
      .catch(err => {
        console.lof('nah, dude')
      })
    });
  };
  handleSubmit(){
    console.log('yo')
    Axios.get( `https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
    .then((response) => {
      console.log('here is the response --->', response.data)
      this.setState({
        data: response.data
      })
    })
    .catch(err => {
      console.lof('nah, dude')
    })
  };

  render(){
    return (
      <>
      <Header
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{ text: 'aniMミ', style: { color: '#fff', fontSize: 25 } }}
    rightComponent={{ icon: 'home', color: '#fff' }}
    containerStyle={{
      backgroundColor: '#3D4AA3',
      justifyContent: 'space-around',
    }}
    />

<Banner 
      visible={this.state.visible} 
      actions={[
        {
          label: 'do a thing',
          onPress: () => this.setState({ visible: false }),
        },
        {
          label: 'ミ',
          onPress: () => this.setState({ visible: false }),
        },
      ]}
      >here is some random fucking text</Banner>
      <SearchBar
      value={this.state.search}
      onChangeText={this.handleChange}
      platform={'ios'}
      round={true}
      showCancel={false}
      showLoading={true}
      returnKeyType = {'search'}
      />
        <Button mode="contained" onPress={() => this.handleSubmit()} color={'#3D4AA3'}>Searchミ</Button>
      <View style={styles.container}>
        <Text>Search for your favorite anime!</Text>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchBar: {
    backgroundColor:'grey'
  }
});
