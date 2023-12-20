
import { StyleSheet, Text, View  } from 'react-native';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useEffect } from "react";
import Database from "./Database";
import DetailScreen from "./screens/DetailScreen";
import EntryScreen from "./screens/EntryScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import EditScreen from './screens/EditScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabNavigator(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  )
}

function StackNavigator(){
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Edit" component={EditScreen} /> 
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
  );
}


const App = () => {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
