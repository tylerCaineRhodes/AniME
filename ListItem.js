import React from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';

export default function ListItem(){
  return (
    <View style={styles.item}>
    <Image
      style={{width: 100, height: 100}}
      source={require('./assets/icon.png')}
    />
      <Text style={styles.title}>Anime Name</Text>
      <Text style={styles.description}>here is a description of an anime</Text>
    </View>

  );
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
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    borderWidth: 1,

  },
  title: {
    fontWeight:'bold',
    position: 'relative',
    left: 55
  },
  description: {
    top: 30,
    position: 'relative',
    right: 55
  }
});