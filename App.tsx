import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  function HomeScreen(props: any) {
    const navigation = props.navigation;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <View style = {{ marginVertical: 10}}>
          <Button
            onPress = {() => navigation.navigate("Details")}
            title= 'Go to Detail'
          />
        </View>

        <View style = {{ marginVertical: 10}}>
          <Button
            onPress = {() => navigation.navigate("Details")}
            title= 'Go user id = 1'
          />
          </View>

          <View style = {{ marginVertical: 10}}>
          <Button
            onPress = {() => navigation.navigate("Details")}
            title= 'Go user id = 2'
          />
        </View>
      </View>
    );
  }

  function DetailsScreen() {
    const navigation:any = useNavigation();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>User id = </Text>
        <Button
          onPress = {() => navigation.goBack()}
          title= 'Go back Home'
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name = "Home" component={HomeScreen}/>
          <Stack.Screen name = "Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
