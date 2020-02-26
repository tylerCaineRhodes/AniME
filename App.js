import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, SearchBar, Overlay} from 'react-native-elements';
import {Banner, Button} from 'react-native-paper';
import Axios from 'axios';
import ListItem from './ListItem.js';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      search: '',
      data: [],
      savedList: [],
      visible: true,
      infoIsVisible: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    // Axios.get( `https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
  }

  handleFuzzySearch

  handleChange(search){
    // console.log(search)
      this.setState({search})
      // this.setState({search}, () => {
      //   Axios.get( `https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
      //   .then((response) => {
      //     console.log('here is the response --->', response.data)
      //     this.setState({
      //       data: response.data
      //     })
      //   })
      //   .catch(err => {
      //     console.lof('nah, dude')
      //   })
      // });
   };
  handleSubmit(){
    // console.log('this should be search -->', this.state.search)
    Axios.get( `https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
    .then((response) => {
      // console.log('here is the response --->', response.data)
      //create result array
      let result = [];
      //iterate over the object
      for(var keys in response.data){
        result.push(response.data[keys])
      }
      this.setState({
        data: result[3],
        search: ''
      })
    })
    .then(() => {
      // console.log('this data should be an array --->', this.state.data)
    })
    .catch(err => {
      console.lof('nah, dude')
    })
  };

  render(){
    const opener = <Text style={styles.message}>Search for your favorite anime!</Text>
    const nothing = <Text>""</Text>
    return (
      <>
      <Header
    leftComponent={{ icon: 'menu', color: '#fff' }}
    centerComponent={{ text: 'aniMミ', style: { color: '#fff', fontSize: 25 } }}
    rightComponent={{ icon: 'home', color: '#fff', onPress: ()=> console.log('go home')}}
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

        <Button mode="contained" onPress={() => this.handleSubmit()} color={'#3D4AA3'}>Sミarch</Button>
        <ScrollView>

          {this.state.data.map((item, i) => {
            // console.log('current item -->', item)
            return (
              <ListItem key={i} image={item.image_url} title={item.title} description={item.synopsis} />
            )
          })}
      
      <View style={styles.container}>
       {this.state.data.length === 0 ? opener : nothing}
      </View>
      </ScrollView>
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
  },
  message: {
    top: 250
  }
});
