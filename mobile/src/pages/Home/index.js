import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DuoSearchPage from './pages/DuoList';
function PersonScreen(){
  return(
    <View style={{backgroundColor:'gray', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Person!</Text>
    </View>
  );
}
function HomeScreen() {
  return (
    <View style={{ backgroundColor:'gray',flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{backgroundColor:'gray', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'md-home';
        } else if (route.name === 'Settings') {
          iconName = 'md-settings';
        }else if(route.name=='User'){
          iconName = 'ios-person';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'yellow',
      inactiveTintColor: 'gray',
      style:{
        backgroundColor:'black',
      }
    }}
      >
      <Tab.Screen name="User" component={PersonScreen}/>
      <Tab.Screen name="Home" component={DuoSearchPage} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}