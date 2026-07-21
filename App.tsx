import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  //data-type
  //string
  const[name, setName] = useState<string>("DiAyTi");

  //number
  const[age, setAge] = useState<number>(21);

  //null, undifined, boolean
  const test = false;

  //object, array
  const[person, setPerson] = useState([{
    name: "DiAyTi",
    age: 21
  }]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{JSON.stringify(person)}</Text>
      </View>
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
