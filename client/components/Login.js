import React from 'react'
import { 
  StyleSheet, 
  Text, 
  TextInput,
  View, 
  Image, 
  TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Input } from 'react-native-elements';


const Login = ({ navigation }) => {
  const goHome = () => navigation.navigate('Home')
  return (
    <View>
      <Text>Username</Text>
      <Input placeholder='username' style={styles.formInput} />
      <Text>password</Text>
      <Input placeholder='password' style={styles.formInput} />
      <Button onPress={goHome}>Login</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  bigButton: {
    marginHorizontal: 2,
    borderRadius: 15,
  },
  formInput: {
    marginTop: '10%',
  }
});

export default Login;