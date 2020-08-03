import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-elements';

export default function ItemInfo({
  description,
  title,
  title_japanese,
  image,
  handleGoHome,
  itemId,
  addToList,
}) {
  
  return (
    <ScrollView>
      <View style={styles.item}>
        <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{title_japanese}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttonLine}>
          <Button
            title='home 帰る'
            buttonStyle={styles.button}
            onPress={() => {
              handleGoHome();
            }}
          />
          <Button
            title='Add to list! セーブデータ'
            buttonStyle={styles.button}
            onPress={() => {
              addToList(itemId);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
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
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
  },
  title: {
    fontWeight: 'bold',
    position: 'relative',
    marginVertical: 2,
  },
  description: {
    width: 300,
    marginTop: 30
  },
  buttonLine: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    margin: 10,
    backgroundColor: '#3D4AA3',
    borderRadius: 5,
  },
});
