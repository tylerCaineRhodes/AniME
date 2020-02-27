import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, SearchBar, Overlay, Image} from 'react-native-elements';
import {Banner, Button, ThemeProvider} from 'react-native-paper';
import Axios from 'axios';
import ListItem from './ListItem.js';
import ItemInfo from './ItemInfo.js';
import SavedItem from './SavedItem';
import Logo from './assets/animelogo_opt1.png';
import AppLogo from './assets/animeicon_480.png';

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      search: '',
      data: [],
      savedList: [],
      currentAnime: {},
      listShow: false,
      visible: false,
      infoIsVisible: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.requestAnime = this.requestAnime.bind(this);
    this.handleGoHome = this.handleGoHome.bind(this);
    this.addToList = this.addToList.bind(this);
    this.goToHomeScreen = this.goToHomeScreen.bind(this);
    this.showList = this.showList.bind(this);
  }

  componentDidMount(){
    //in componentdidmount, ftech from db and populate list component with savedlist state 
  }
  requestAnime(uniqueId){
    console.log('here is the unique id being passed --> ', uniqueId)
    //make an axios request with that id and set to state.
    Axios.get(`https://api.jikan.moe/v3/anime/${uniqueId}`)
      .then((response) => {
      // console.log('here is the response --->', response.data)
      //create result array
      //iterate over the object
      let animeObj = {};
      animeObj = {'synopsis': response.data['synopsis'], 'title': response.data['title'], 'title_Japanese': response.data['title_japanese'], 'url': response.data['image_url'], 'type': response.data['type'], 'mal_id':response.data['mal_id']}
     
      // console.log('results object ----->', animeObj)
      this.setState({
        currentAnime: animeObj,
        infoIsVisible: true,
        listShow: false,
      })
    })
    .then(() => {
      // console.log('this data should be an object --->', this.state.currentAnime)
    })
    .catch(err => {
      console.log('nah, dude', err)
    })
    //make modal display
  }
  handleGoHome(){
    this.setState({
      infoIsVisible: false,
      listShow: false
    })
  }
  goToHomeScreen(){
    this.setState({
      data: []
    })

  }
  showList(){
    this.setState({
      listShow: true
    })
  }
  addToList(uniqueId){
    console.log('here is the unique id being passed --> ', uniqueId)
    //make an axios request with that id and set to state.
    Axios.get(`https://api.jikan.moe/v3/anime/${uniqueId}`)
      .then((response) => {
      // console.log('here is the response --->', response.data)
      //iterate over the object
      let temp = [];
      let animeObj = {};
      animeObj = {'synopsis': response.data['synopsis'], 'title': response.data['title'], 'title_Japanese': response.data['title_japanese'], 'url': response.data['image_url'], 'type': response.data['type'], 'mal_id':response.data['mal_id']}
      //concat this to state
      // console.log('results object ----->', animeObj)
      let newState = this.state.savedList.slice();
      newState.push(animeObj);
      console.log('here is the new state--->', newState);
      this.setState({
        savedList: newState
      })
    })
    .then(() => {
      // console.log('this data should be an object --->', this.state.savedList)
    })
    .catch(err => {
      console.log('nah, dude', err)
    })
    //get unique id from iteminfo
    //query for that anime
    //create an object and add it to a mysql table
    //in componentdidmount, ftech from db and populate list component with savedlist state 
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
      console.log('nah, dude')
    })
  };

  render(){
    const opener = <Image source={AppLogo} style={{width:150, height: 150}} />
    const nothing = <Text>""</Text>
    return (
      <>
      <Header
    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => {this.setState({visible: !this.state.visible})}}}
    centerComponent={<Image source={Logo} style={{width:150, height: 50, marginBottom: 20}} />}
    rightComponent={{ icon: 'home', color: '#fff', onPress: () => {this.goToHomeScreen()}}}
    containerStyle={{
      backgroundColor: '#3D4AA3',
      justifyContent: 'space-around',
    }}
    />

    <Overlay isVisible={this.state.infoIsVisible} fullScreen={false} borderRadius={20} width={400} containerStyle={styles.modal}>
      <ItemInfo itemId={this.state.currentAnime.mal_id} description={this.state.currentAnime.synopsis} title={this.state.currentAnime.title} title_japanese={this.state.currentAnime.title_Japanese} image={this.state.currentAnime.url} type={this.state.currentAnime.type} handleGoHome={this.handleGoHome} addToList={this.addToList}/>
    </Overlay>

    <Overlay isVisible={this.state.listShow} fullScreen={false} borderRadius={20} width={400} containerStyle={styles.modal}>
    {this.state.savedList.map((item, i) => {
      return (
        <SavedItem key={i} image={item.url} title={item.title} description={item.synopsis} itemId={item.mal_id} requestAnime={this.requestAnime} />
      )
      })}
      <Button mode="contained" onPress={() => this.handleGoHome()} color={'#3D4AA3'}>Homミ</Button>
   </Overlay> 

    <Banner 
      visible={this.state.visible} 
      actions={[
        {
          label: 'Hide',
          onPress: () => this.setState({ visible: false }),
        },
        {
          label: 'List',
          onPress: () => this.setState({ listShow: true}),
        },
      ]}
      >
     </Banner>

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
      
        <View style={styles.message}>
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
    top: 500,
    left: 130
  },
  modal: {
    // position: 'absolute',
    // top: 20
  }
});
