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
import Logo from '../../assets/animelogo_opt1.png';
import Axios from 'axios'



const Login = ({ navigation }) => {
  const goHome = (userId, username) => {
    navigation.navigate('Home', {
      userId,
      username
    });
  }
  const goToSignup = () => navigation.navigate('Signup');
  const [username, handleusername] = useState('');
  const [password, handlepassword] = useState('');

  const handleSubmit = () => {
    Axios.post('http://localhost:3030/signin', {
      username,
      password,
    })
    .then((res) => goHome(res.data[0].id, res.data[0].username))
    .catch((err) => alert(err.response.data));
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={Logo} style={{ width: '100%', height: 120 }}></Image>
      </View>

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
      <Image source={pikachu} style={{ width: 400, height: 280 }}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#3D4AA3',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: '2%',
    borderRadius: 5,
    width: '100%'
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigButton: {
    marginHorizontal: 2,
    borderRadius: 15,
    marginBottom: 2,
  },
  formInputOne: {
    position: 'relative',
    marginTop: '10%',
    width: '80%',
    backgroundColor: '#F1F1F1',
    height: '3%',
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
  formInputTwo: {
    position: 'relative',
    marginVertical: '10%',
    width: '80%',
    backgroundColor: '#F1F1F1',
    height: '2%',
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
  },
});

export default Login;