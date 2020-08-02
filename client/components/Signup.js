import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Input } from 'react-native-elements';
import Axios from 'axios';

const Signup = ({ navigation }) => {
  const [username, handleusername] = useState('');
  const [password, handlepassword] = useState('');
  const goToLogin = () => navigation.navigate('Login');

  const handleSubmit = () => {
    const longEnough = password.length >= 8;
    const hasCapitalLetter = password.match(/[A-Z]/g);

    if(!longEnough){
      return alert('password isn\'t long enough- need to be at least 8 char')
    }
    if(!hasCapitalLetter) {
      return alert('password should have at least one capital letter')
    }
    Axios.post('http://localhost:3030/register', {
      username,
      password,
    })
    .then((res) => goToLogin())
    .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='username'
        style={styles.formInputOne}
        onChangeText={handleusername}
        value={username}
      />
      <TextInput
        placeholder='password'
        style={styles.formInputTwo}
        onChangeText={handlepassword}
        value={password}
      />
      <Button
        style={styles.bigButton}
        mode='contained'
        onPress={handleSubmit}
        color={'#3D4AA3'}
      >
        Register
      </Button>
      <Text>Already have an account? </Text>
      <Button onPress={goToLogin}>Login</Button>
      {/* <Image source={pikachu} style={{ width: 400, height: 400 }}></Image> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  bigButton: {
    marginHorizontal: 2,
    borderRadius: 15,
    marginBottom: 2
  },
  formInputOne: {
    position: 'relative',
    marginTop: '30%',
    width: '80%',
    backgroundColor: '#F1F1F1',
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
  formInputTwo: {
    position: 'relative',
    marginVertical: '10%',
    width: '80%',
    backgroundColor: '#F1F1F1',
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
});

export default Signup;
