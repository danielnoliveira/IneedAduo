import React,{useState} from 'react';
import {View,TextInput,Text,TouchableOpacity,ScrollView,KeyboardAvoidingView,Platform} from 'react-native';
import styles from '../Login/styles';
import global from '../global';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
export default function Login(){
    const navigation = useNavigation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    function navigateBack(){
        navigation.goBack();
    }
    function navigateToHomeScreen(){
        navigation.navigate('Home');
    }
    async function Logar(){
        api.post('logar',{
            email,
            password
        }).then(response=>{
            if (response.data.very) {
                alert('Bem vindo usuario');
                navigateToHomeScreen();
            }else{
                alert("Email ou Senha incorretos!!!");
            }
        }).catch(error=>{
            alert('Algum erro ocorreu, por favor tente novamente mais tarde.');
        });
    }
    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <ScrollView style={styles.scrollArea}>
                <TouchableOpacity 
                        style={global.backButton}
                        onPress={navigateBack}
                    >
                    <Feather name="arrow-left" size={28} color="black"/>
                </TouchableOpacity>
                <View style={styles.formSpace}>
                    <TextInput 
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                        placeholder="Email"
                        style={styles.input}
                    />
                    <TextInput 
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={Logar}
                    >
                        <Feather name="log-in" size={28} color="yellow"/>
                        <Text style={styles.textLoginButton}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}