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
    this.requestAnime = this.requestAnime.bind(this);
  }

  componentDidMount(){
    // Axios.get( `https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
  }
  requestAnime(uniqueId){
    console.log('here is the unique id being passd --> ', uniqueId)
    //make an axios request with that id and set to state.
    Axios.get(`https://api.jikan.moe/v3/anime/${uniqueId}`)
      .then((response) => {
      // console.log('here is the response --->', response.data)
      //create result array
      let result = [];
      //iterate over the object
      let animeObj = {};
      animeObj = {'synopsis': response.data['synopsis'], 'title': response.data['title'], 'title_Japanese': response.data['title_japanese'], 'url': response.data['url'], 'type': response.data['type']}
     
      // console.log('results object ----->', animeObj)
      this.setState({
        currentAnime: animeObj,
        // infoIsVisible: true
      })
    })
    .then(() => {
      console.log('this data should be an object --->', this.state.currentAnime)
    })
    .catch(err => {
      console.log('nah, dude', err)
    })
    //make modal display

  }
  
  handleChange(search){
    // console.log(search)
      this.setState({search})
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

    <Overlay isVisible={this.state.infoIsVisible} >
      <View>
        <Text>modal with text</Text>
      </View>
    </Overlay>


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
              <ListItem key={i} image={item.image_url} title={item.title} description={item.synopsis} itemId={item.mal_id} requestAnime={this.requestAnime} />
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
