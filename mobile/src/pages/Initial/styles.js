import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c1c1c1',
    },
    title:{
        fontSize:30,
        color:'yellow',
        fontWeight:'bold',
        marginBottom:200
    },
    button: {
        alignItems:'center',
        backgroundColor:'#000',
        padding: 10,
        width:250,
        marginBottom:5,
        borderRadius: 20,
    },
    loginTextButton:{
        fontWeight:'bold',
        fontSize:24,
        color: 'yellow',
        letterSpacing:5,
    },
    cadastroTextButton:{
        fontWeight:'bold',
        fontSize:24,
        color: 'yellow',
        letterSpacing:5,
    }
});