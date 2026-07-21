import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button , StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const[name, setName] = useState<string>("a");

  //number
  const[age, setAge] = useState<number>(21);

  //null, undefined, boolean
  const test = false;

  //object, array
  const[person, setPerson] = useState([{
    name: "DiAyTi",
    age: 21
  }]);

  return (
    <View style={styles.container}>
      <View>
        
        <TextInput 
        onChangeText={value => setName(value)}
        value={name}
        autoCapitalize='none'
        autoCorrect= {false}
        // keyboardType='numeric'
        // maxLength={2} //textarea
        // multiline
        style={{
          borderColor: "violet",
          borderWidth: 1,
          padding: 10
        }}></TextInput>
        <Text style={styles.text}>{name}</Text>
      </View>

      <Button title = 'Add new'/>

      <Text style={styles.text}>Hello World 
        <Text style={styles.DiAyti}> DiAyTi</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  DiAyti: {
    color: 'green',
  },
  text: {
    fontSize: 30,
    color: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    fontSize: 60,
    color: 'red',
    paddingTop: 20,
    paddingHorizontal: 20
  },
});
