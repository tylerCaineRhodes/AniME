import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image} from 'react-native';

export default function ListItem({title, image, description, itemId}){
  // console.log(image)
  const [id] = useState(itemId);
  
  return (
    <View style={styles.item}>
    <Image
      source={{uri: image}}
      style={{width: 100, height: 100}}
    />
      <Text style={styles.title}>{title} and the id is {id}</Text>
      <Text style={styles.description}>{description}</Text>
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
    overflow: 'scroll'

  },
  title: {
    fontWeight:'bold',
    position: 'relative',
    left: 55
  },
  description: {
    top: 30,
    marginTop: 20,
    left: 150,
    position: 'absolute',
    width: 250
  
  }
});