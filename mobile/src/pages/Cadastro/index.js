import React,{useState} from 'react';
import {View,TextInput,Text,TouchableOpacity,Picker} from 'react-native';
import styles from '../Cadastro/styles';
import global from '../global';
import {Feather} from '@expo/vector-icons';
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
                    placeholder="Username do League of Legends"
                    style={styles.input}
                />
                <Picker
                    selectedValue={role}
                    style={styles.roleSelector}
                    onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
                >
                    <Picker.Item label="Sua função" value=""/>
                    <Picker.Item label="ADC" value="ADC" />
                    <Picker.Item label="SUP" value="SUP" />
                    <Picker.Item label="MID" value="MID" />
                    <Picker.Item label="TOP" value="TOP" />
                    <Picker.Item label="JUNGLER" value="JUNGLER" />
                </Picker>
                <TextInput 
                    value={email}
                    onChange={(text)=>setEmail(text)}
                    placeholder="Email"
                    style={styles.input}
                />
                <TextInput 
                    value={whatsapp}
                    onChange={(text)=>setWhatsapp(text)}
                    placeholder="Numero do Whatsapp"
                    style={styles.input}
                />
                <TextInput 
                    value={password}
                    onChange={(text)=>setPassword(text)}
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TextInput 
                    value={Repassword}
                    onChange={(text)=>setRepassword(text)}
                    placeholder="Repita o password"
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    style={styles.cadastroButton}
                    onPress={()=>{}}
                >
                    <Feather name="save" size={28} color="yellow"/>
                    <Text style={styles.textCadastroButton}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}