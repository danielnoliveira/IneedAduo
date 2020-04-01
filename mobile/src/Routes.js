import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const AppStack = createStackNavigator();
import Initial from './pages/Initial';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name="Initial" component={Initial}/>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="Cadastro" component={Cadastro}/>
                <AppStack.Screen name="Home" component={Home}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}