import React,{useState} from 'react';
import {View,TextInput,TouchableOpacity} from 'react-native';
import styles from '../Login/styles';
import global from '../global';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
export default function Login(){
    const navigation = useNavigation();
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    function navigateBack(){
        navigation.goBack();
    }
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                    style={global.backButton}
                    onPress={navigateBack}
                >
                <Feather name="arrow-left" size={28} color="yellow"/>
            </TouchableOpacity>
            <View style={styles.formSpace}>
                <TextInput 
                    value={name}
                    onChange={(text)=>setName(text)}
                    placeholder="Username"
                    style={styles.input}
                />
                <TextInput 
                    value={password}
                    onChange={(text)=>setPassword(text)}
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={true}
                />
            </View>
        </View>
    );
}