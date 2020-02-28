import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import { AuthSession } from 'expo';

export default function ListItem({title, image, description, itemId, requestAnime}){
  // console.log(image)
  const [id] = useState(itemId);
    //requestAnime(id)
  
  return (
    <TouchableOpacity onPress={() => requestAnime(itemId)}>  
    <View style={styles.item}>
    <Image
      source={{uri: image}}
      style={{width: 100, height: 100, marginTop: 20}}
    />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    </TouchableOpacity>
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
    // height: 160,
    borderWidth: .6,
    overflow: "hidden",
  },
  title: {
    fontWeight:'bold',
    position: 'relative',
    left: 55,
    // fontFamily:'sans-serif',
  },
  description: {
    top: 30,
    marginTop: 20,
    left: 150,
    position: 'absolute',
    width: 250,
  }
});