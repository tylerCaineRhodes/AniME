import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Input } from 'react-native-elements';

const Signup = ({ navigation }) => {
  const goHome = () => navigation.navigate('Home');

  return (
    <>
      <Input placeholder='username' style={styles.formInput} />
      <Input placeholder='password' style={styles.formInput} />

      <Button
        style={styles.bigButton}
        mode='contained'
        onPress={goHome}
        color={'#3D4AA3'}
      >
        Signup
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  bigButton: {
    marginHorizontal: 2,
    borderRadius: 15,
  },
  formInput: {
    marginTop: '10%',
  },
});

export default Signup;
