import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { AuthSession } from 'expo';

export default function SavedItem({
  title,
  image,
  itemId,
  requestAnime,
  deleteAnime,
}) {
  
  return (
    <TouchableOpacity onPress={() => requestAnime(itemId)}>
      <View style={styles.item}>
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, position: 'absolute', top: -5, margin: 10, borderRadius: 15 }}
        />

        <View style={styles.itemContainer}>
          <Text ellipsizeMode="tail" style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>


        <View style={styles.buttonsPair}>
          <Icon
            name="cancel"
            size={28}
            color={'red'}
            onPress={() => {
              deleteAnime(itemId);
            }}
            containerStyle={styles.buttonDelete}
          />
          <Icon
            name="share"
            size={30}
            color={'#3D4AA3'}
            onPress={() => {
              handleGoHome();
            }}
            containerStyle={styles.buttonShare}
          />
        </View>
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
    margin: 20,
  },
  SearchBar: {
    backgroundColor: 'grey',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 25,
    // height: 160,
    borderWidth: .5,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10
  },
  title: {
    fontWeight: 'bold',
    position: 'absolute',
    textAlignVertical: 'center',
    fontSize: 15,
    width: 245
  },
  description: {
    top: 30,
    marginTop: 20,
    left: 150,
    position: 'relative',
    width: 250,
  },
  buttonPair: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonDelete: {
    top: '80%',
    left: 13,
    backgroundColor: 'white',
    padding: 0,
  },
  buttonShare: {
    top: 18,
    right: 180,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    left: '27%',
    bottom: '20%',
    textAlign: 'left',
    marginHorizontal: '3%',
    borderWidth: 0,
    overflow: 'hidden',
    height: 40,
    // width: '100%'
  },
});
