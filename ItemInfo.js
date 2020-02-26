import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

export default function ItemInfo ({description, title, title_japanese, image, type}){
  
 return (
  <View style={styles.item}>
  <Image
    source={{uri: image}}
    style={{width: 200, height: 200}}
  />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{title_japanese}</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    // padding: 20,
    borderWidth: 1,
    overflow: "scroll"
  },
  title: {
    fontWeight:'bold',
    position: 'relative',
    // left: 55
  },
  description: {
    // top: 30,
    // marginTop: 20,
    // left: 150,
    // position: 'absolute',
    width: 300
  
  }
});