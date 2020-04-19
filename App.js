import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, SearchBar, Overlay, Image, Icon } from 'react-native-elements';
import { Banner, Button, ThemeProvider } from 'react-native-paper';
import Axios from 'axios';
import ListItem from './client/components/ListItem.js';
import ItemInfo from './client/components/ItemInfo.js';
import SavedItem from './client/components/SavedItem';
import Logo from './assets/animelogo_opt1.png';
import AppLogo from './assets/animeicon_480.png';
import Classics from './assets/animecollage1.jpg';
import Newies from './assets/animecollage2.png';
import Pikachu from './assets/pikachuWithHat.png';
{/* <Image source={Classics} style={{width:'100%', height: 750}} />
<Image source={Pikachu} style={{width: 400, height: 400}} /> */}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.requestAnime = this.requestAnime.bind(this);
    this.handleGoHome = this.handleGoHome.bind(this);
    this.addToList = this.addToList.bind(this);
    this.goToHomeScreen = this.goToHomeScreen.bind(this);
    this.showList = this.showList.bind(this);
    this.fetchUserList = this.fetchUserList.bind(this);
    this.deleteAnime = this.deleteAnime.bind(this);
  }

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList() {
    Axios.get('http://localhost:3030/getUserList')
      .then((response) => {
        this.setState({
          savedList: response.data,
        });
      })
      .catch((err) => {
        console.log('problem with fetching data dawg', err);
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
        console.log('nah, dude from request anime', err);
      });
  }

  handleGoHome() {
    this.setState({
      infoIsVisible: false,
      listShow: false,
    });
  }

  goToHomeScreen() {
    this.setState({
      data: [],
    });
  }

  showList() {
    this.setState({
      listShow: true,
    });
  }

  postNewItem(response) {
    Axios.post('http://localhost:3030/postNewItem', {
      synopsis: response.data['synopsis'],
      title: response.data['title'],
      title_Japanese: response.data['title_japanese'],
      url: response.data['image_url'],
      type: response.data['type'],
      mal_id: response.data['mal_id'],
      episodes: response.data['episodes'],
      rating: response.data['rating'],
    })
      .then(() => {
        this.fetchUserList();
      })
      .catch((err) => {
        console.log("didn't work when sending from axios", err);
      });
  }

  deleteAnime(uniqueId) {
    Axios.delete('http://localhost:3030/deleteAnime', {
      params: { uniqueId },
    })
      .then(() => {
        console.log('succesfully deleted!');
        this.fetchUserList();
      })
      .catch((err) => {
        console.log("couldn't delete from front", err);
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
        console.log('nah, dude', err);
      });
  }

  handleChange(search) {
    this.setState({ search });
  }

  handleSubmit() {
    Axios.get(`https://api.jikan.moe/v3/search/anime?q=${this.state.search}&limit=10`)
      .then((response) => {
        let result = [];

        for (var keys in response.data) {
          result.push(response.data[keys]);
        }
        this.setState({
          data: result[3],
          search: '',
        });
      })
      .catch((err) => {
        console.log('nah, dude');
      });
  }

  render() {
    const opener = (
      <Image source={Classics} style={{ width: '100%', height: 750 }} />
    );
    const nothing = <Text>""</Text>;
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
              mode="contained"
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
          // icon={({ size }) =>
          //     <Image
          //       source={Pikachu}
          //       style={{
          //         width: 10,
          //         height: 20,
          //       }}
          //     />
          //   }
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
          mode="contained"
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
            {/* <Text style={styles.textHello}>Search for your favorite anime!</Text> */}
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
    // top: 200,
    // left: 11,
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
