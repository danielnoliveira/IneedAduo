import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const AppStack = createStackNavigator();
import Initial from './pages/Initial';
import Login from './pages/Login';

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Initial" component={Initial}/>
                <AppStack.Screen name="Login" component={Login}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}