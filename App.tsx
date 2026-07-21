import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>test</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 60,
    color: 'red',
  },
});
