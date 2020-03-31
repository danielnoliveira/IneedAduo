import React from 'react';
import {View,Text,TouchableOpacity } from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
export default function Initial(){
    const navigation = useNavigation();

    function navigateToLoginScreen(){
        navigation.navigate('Login');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>I Need a Duo</Text>
            <TouchableOpacity style={[styles.button,{marginBottom:10}]} onPress={navigateToLoginScreen}>
                <Text style={styles.loginTextButton}>LOGAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{}}>
                <Text style={styles.cadastroTextButton}>CADASTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}