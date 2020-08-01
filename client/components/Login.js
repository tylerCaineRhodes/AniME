import React, { useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput,
  View, 
  Image, 
  TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import pikachu from '../../assets/pikachuWithHat.png';
import Axios from 'axios'



const Login = ({ navigation }) => {
  const goHome = () => navigation.navigate('Home')
  const goToSignup = () => navigation.navigate('Signup');
  const [username, handleusername] = useState('');
  const [password, handlepassword] = useState('');

  const handleSubmit = () => {
    const longEnough = password.length >= 8;
    const hasCapitalLetter = password.match(/[A-Z]/g);

    if(!longEnough){
      return alert('password isn\'t long enough- need to be at least 8 char')
    }
    if(!hasCapitalLetter) {
      return alert('password should have at least one capital letter')
    }
    Axios.post('http://localhost:3030/signin', {
      username,
      password,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log('somethign went wrong from client -->', err));
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
        Login
      </Button>
      <Text>Don't have an account? </Text>
      <Button onPress={goToSignup}>Signup</Button>
      <Image source={pikachu} style={{ width: 400, height: 400 }}></Image>
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

export default Login;