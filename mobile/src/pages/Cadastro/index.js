import React,{useState} from 'react';
import {View,TextInput,Text,TouchableOpacity,Picker,KeyboardAvoidingView,Platform,ScrollView} from 'react-native';
import styles from '../Cadastro/styles';
import global from '../global';
import {Feather} from '@expo/vector-icons';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';
export default function Login(){
    const navigation = useNavigation();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [password,setPassword] = useState('');
    const [Repassword,setRepassword] = useState('');
    const [role,setRole] = useState('');
    function navigateBack(){
        navigation.goBack();
    }
    function navigateToHomeScreen(){
        navigation.navigate('Home');
    }
    function register(){
        api.get('userexists')
        .then((response)=>{
            const {very} = response.data;
            if(very){
                const user_info = {username:name,email,password,whatsapp,role};
                api.post('user',user_info)
                .then(response => {
                    const v = response.data.very;
                    if (v) {
                        alert('Usuario cadastrado com sucesso. Direcionando para a pagina Home');
                        navigateToHomeScreen();
                    }
                })
                .catch(err=>console.log(err));
            }
            
        }).catch(err=>console.log(err));
        // if (very) {
        //     // if (password==Repassword) {
        //     //     const data = {
        //     //         username:name,
        //     //         email,
        //     //         password,
        //     //         whatsapp,
        //     //         role,
        //     //     };
        //     //     let {very} = await api.post('/user',data);
        //     //     if (very) {
        //     //         alert('Sucesso','Cadastro feito com sucesso, bem vindo ao "I need a Duo".' );
        //     //         navigateToHomeScreen();
        //     //     }
        //     // }else{
        //     //     alert('Senhas não combinam','Por favor digite a senha novamente nos dois campos.');
        //     // }
        // }else{
        //     alert('Usuario nao existe','Por favor verifique se digitou seu apelido no game corretamente.');
        // }
    }
    return(
        <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}>
      <ScrollView style={styles.scrollArea}>
            <TouchableOpacity 
                    style={global.backButton}
                    onPress={navigateBack}
                >
                <Feather name="arrow-left" size={28} color="black"/>
            </TouchableOpacity>
            <View style={styles.formSpace}>
                <TextInput 
                    onChangeText={newName=>setName(newName)}
                    placeholder="Seu apelido no League of Legends"
                    value={name}
                    style={styles.input}
                />
                <View style={styles.PickerBorder}>

                    <Picker
                        style={styles.roleSelector}
                        selectedValue={role}
                        onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                    >
                        <Picker.Item label="Sua função" value=""/>
                        <Picker.Item label="ADC" value="ADC" />
                        <Picker.Item label="SUP" value="SUP" />
                        <Picker.Item label="MID" value="MID" />
                        <Picker.Item label="TOP" value="TOP" />
                        <Picker.Item label="JUNGLER" value="JUNGLER" />
                    </Picker>
                </View>
                <TextInput 
                    onChangeText={newEmail=>setEmail(newEmail)}
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                />
                <TextInput 
                    onChangeText={newWhatts=>setWhatsapp(newWhatts)}
                    placeholder="Numero do Whatsapp"
                    style={styles.input}
                    value={whatsapp}
                />
                <TextInput 
                    onChangeText={newPass=>setPassword(newPass)}
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    secureTextEntry={true}
                />
                <TextInput 
                    onChangeText={newPassre=>setRepassword(newPassre)}
                    placeholder="Repita o password"
                    style={styles.input}
                    value={Repassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    style={styles.cadastroButton}
                    onPress={register}
                >
                    <Feather name="save" size={28} color="yellow"/>
                    <Text style={styles.textCadastroButton}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}