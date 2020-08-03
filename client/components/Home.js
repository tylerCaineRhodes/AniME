import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, SearchBar, Overlay, Image, Icon } from 'react-native-elements';
import { Banner, Button } from 'react-native-paper';
import Axios from 'axios';
import ListItem from './ListItem.js';
import ItemInfo from './ItemInfo.js';
import SavedItem from './SavedItem';
import Logo from '../../assets/animelogo_opt1.png';
import Classics from '../../assets/animecollage1.jpg';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.route.params.userId,
      username: this.props.route.params.username,
      search: '',
      data: [],
      savedList: [],
      currentAnime: {},
      listShow: false,
      visible: false,
      infoIsVisible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFuzzySearch = this.handleFuzzySearch.bind(this);
    this.requestAnime = this.requestAnime.bind(this);
    this.handleGoHome = this.handleGoHome.bind(this);
    this.addToList = this.addToList.bind(this);
    this.goToHomeScreen = this.goToHomeScreen.bind(this);
    this.showList = this.showList.bind(this);
    this.fetchUserList = this.fetchUserList.bind(this);
    this.deleteAnime = this.deleteAnime.bind(this);
    this.addToUserList = this.addToUserList.bind(this);
  }

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList() {
    Axios.get(`http://localhost:3030/getUserList/${this.state.userId}`)
      .then((response) => {
        this.setState({
          savedList: response.data,
        });
      })
      .catch((err) => {
        console.log('problem with fetching users from junction in the front', err);
      });
  }

  requestAnime(uniqueId) {
    Axios.get(`https://api.jikan.moe/v3/anime/${uniqueId}`)
      .then((response) => {
        let animeObj = {
          synopsis: response.data['synopsis'],
          title: response.data['title'],
          title_Japanese: response.data['title_japanese'],
          url: response.data['image_url'],
          type: response.data['type'],
          mal_id: response.data['mal_id'],
        };

        this.setState({
          currentAnime: animeObj,
          infoIsVisible: true,
          listShow: false,
        });
      })
      .catch((err) => {
        console.log('problem with requesting anime', err);
      });
  }

  handleGoHome() {
    this.setState({
      infoIsVisible: false,
      listShow: false,
      search: ''
    });
  }

  goToHomeScreen() {
    this.setState({
      data: [],
      search: ''
    });
  }

  showList() {
    this.setState({
      listShow: true,
    });
  }

  addToUserList(mal_id){
    Axios.post('http://localhost:3030/addToJunction', {
      mal_id: mal_id,
      userId: this.state.userId,
    })
      .then(() => console.log('added to junction'))
      .catch((err) => console.log(err, '<-- in trying to catch junction'));
  }

  postNewItem(response) {
    const savedAnimeId = response.data['mal_id'];
    Axios.post('http://localhost:3030/postNewItem', {
      synopsis: response.data['synopsis'],
      title: response.data['title'],
      title_Japanese: response.data['title_japanese'],
      url: response.data['image_url'],
      type: response.data['type'],
      mal_id: response.data['mal_id'],
      episodes: response.data['episodes'],
      rating: response.data['rating'],
      userId: this.state.userId,
    })
      .then(() => {
        this.addToUserList(savedAnimeId);
      })
      .then(() => {
        this.fetchUserList();
      })
      .catch((err) => {
        console.log("didn't work when sending from axios from postNewItem", err);
      });
  }

  deleteAnime(uniqueId) {
    Axios.delete(`http://localhost:3030/deleteAnime`, {
      data: { 
        mal_id: uniqueId,
        user_id: this.state.userId
      },
    })
      .then(() => {
        this.fetchUserList();
      })
      .catch((err) => {
        console.log('couldn\'t delete from axios', err);
      });
  }
  
  addToList(uniqueId) {
    Axios.get(`https://api.jikan.moe/v3/anime/${uniqueId}`)
      .then((response) => {
        this.postNewItem(response);
      })
      .then(() => {
        this.setState({
          infoIsVisible: false,
        });
      })
      .catch((err) => {
        console.log('error from querying jikan', err);
      });
  }

  handleChange(search) {
    this.setState({ search }, () => {
      this.handleFuzzySearch();
    });
  }

  handleSubmit() {
    Axios.get(`https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=15`)
      .then((response) => {
        const { results } = response.data;
        this.setState({
          data: results,
          search: '',
        });
      })
      .catch((err) => {
        console.log('error from handle submit', err);
      });
  }

  handleFuzzySearch() {
    setTimeout(() => {
      Axios.get(`https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
        .then((response) => {
          const { results } = response.data;
  
          this.setState({
            data: results,
          });
        })
        .catch((err) => {
          console.log('fuzzy search blip');
        });
    }, 0);
  }

  render() {
    const opener = (
      <Image source={Classics} style={{ width: '100%', height: 750 }} />
    );
    const nothing = <Text></Text>;
    return (
      <>
        <Header
          leftComponent={{
            icon: 'home',
            color: '#fff',
            onPress: () => {
              this.goToHomeScreen();
            },
          }}
          centerComponent={
            <Image
              source={Logo}
              style={{ width: 150, height: 50, marginBottom: 20 }}
            />
          }
          rightComponent={{
            icon: 'list',
            color: '#fff',
            onPress: () => {
              this.showList();
            },
          }}
          containerStyle={{
            backgroundColor: '#3D4AA3',
            justifyContent: 'space-around',
          }}
        />

        <Overlay
          isVisible={this.state.infoIsVisible}
          fullScreen={false}
          borderRadius={20}
          width={400}
          containerStyle={styles.modal}
        >
          <ItemInfo
            itemId={this.state.currentAnime.mal_id}
            description={this.state.currentAnime.synopsis}
            title={this.state.currentAnime.title}
            title_japanese={this.state.currentAnime.title_Japanese}
            image={this.state.currentAnime.url}
            type={this.state.currentAnime.type}
            handleGoHome={this.handleGoHome}
            addToList={this.addToList}
          />
        </Overlay>

        <Overlay
          isVisible={this.state.listShow}
          fullScreen={false}
          borderRadius={20}
          width={400}
          containerStyle={styles.modal}
        >
          <ScrollView>
            {this.state.savedList.map((item, i) => {
              return (
                <SavedItem
                  key={i}
                  image={item.url}
                  title={item.title}
                  description={item.synopsis}
                  itemId={item.mal_id}
                  requestAnime={this.requestAnime}
                  deleteAnime={this.deleteAnime}
                />
              );
            })}
            <Button
              mode='contained'
              style={styles.bigButton}
              onPress={() => this.handleGoHome()}
              color={'#3D4AA3'}
            >
              Homミ
            </Button>
          </ScrollView>
        </Overlay>

        <Banner
          style={styles.banner}
          contentStyle={styles.links}
          visible={this.state.visible}
          actions={[
            {
              label: 'profile',
              onPress: () => this.setState({ visible: false }),
            },
            {
              label: 'settings',
              onPress: () => this.setState({ listShow: true }),
            },
            {
              label: 'friends',
              onPress: () => this.setState({ listShow: true }),
            },
            {
              label: 'list',
              onPress: () => this.setState({ listShow: true }),
            },
          ]}
        ></Banner>

        <SearchBar
          value={this.state.search}
          onChangeText={this.handleChange}
          platform={'ios'}
          round={true}
          showCancel={false}
          showLoading={true}
          returnKeyType={'search'}
        />

        <Button
          mode='contained'
          style={styles.bigButton}
          onPress={() => this.handleSubmit()}
          color={'#3D4AA3'}
        >
          Sミarch
        </Button>
        <ScrollView>
          {this.state.data.map((item, i) => {
            return (
              <ListItem
                key={i}
                image={item.image_url}
                title={item.title}
                description={item.synopsis}
                itemId={item.mal_id}
                requestAnime={this.requestAnime}
              />
            );
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
    backgroundColor: 'grey',
  },
  message: {
    overflow: 'scroll',
  },
  textHello: {
    fontWeight: 'bold',
    left: 50,
    fontSize: 30,
  },
  bigButton: {
    marginHorizontal: 2,
    borderRadius: 15,
  },
  links: {
    left: 0,
  },
  banner: {
    opacity: 1.5,
  },
});
