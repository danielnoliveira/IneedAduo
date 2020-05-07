import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: 'white',

    },
    scrollArea:{
        flex:1,
        backgroundColor:'white'
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 20,
        marginVertical: 20,
    },
    formSpace: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical:50
      },
      cadastroButton:{
          backgroundColor: '#000',
          flexDirection: 'row',
          alignItems:'center',
          justifyContent:'space-around',
          height:50,
          width:150,
          paddingHorizontal:15,
          borderRadius:25,
          marginVertical: 20,
      },
      textCadastroButton:{
          color:'yellow',
          fontWeight: 'bold',
      },
      roleSelector:{
          height:50,
          width:150,

      },
      PickerBorder: {
        flex:1,
        borderWidth: 1,
        borderStyle:'solid',
        borderBottomColor: '#000',
        borderRadius:20,
        height:50,
        marginVertical:14
      }
});