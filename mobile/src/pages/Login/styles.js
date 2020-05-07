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
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginVertical:200
      },
      loginButton:{
          backgroundColor: '#000',
          flexDirection: 'row',
          alignItems:'center',
          justifyContent:'space-around',
          height:60,
          width:150,
          paddingHorizontal:15,
          borderRadius:25,
          marginVertical:20,
      },
      textLoginButton:{
          color:'yellow',
          fontWeight: 'bold',
      }
});