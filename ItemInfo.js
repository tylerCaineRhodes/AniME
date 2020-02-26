import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Button } from 'react-native-elements';

export default function ItemInfo ({description, title, title_japanese, image, type, handleGoHome}){
  
 return (
   <ScrollView>
  <View style={styles.item}>
  <Image
    source={{uri: image}}
    style={{width: 250, height: 250}}
  />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{title_japanese}</Text>
    <Text style={styles.description}>{description}</Text>
    <View style={styles.buttonLine}>
    <Button title='home 帰る' buttonStyle={styles.button} onPress={() => {handleGoHome()}}/>
    <Button title='Add to list! セーブデータ' buttonStyle={styles.button}/>
    </View>
  </View>
  </ScrollView>
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
    overflow: "scroll"
  },
  title: {
    fontWeight:'bold',
    position: 'relative',
  },
  description: {
    width: 300
  },
  buttonLine: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    margin: 10
  }
});