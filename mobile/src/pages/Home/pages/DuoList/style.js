import React from 'react';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        
    },
    searchHeader:{
        marginTop:-30,
        backgroundColor:'yellow',
        height:200,
        width:'100%',
        alignItems:'center',
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        
    },
    roleSelector:{
        width: 200,
        height:40,
        color:'yellow',
        marginHorizontal:40,
        backgroundColor:'black',
        marginTop:80,
        marginBottom:10
    },
    searchButton:{
        width:150,
        height:40,
        borderRadius:20,
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:0
    },
    searchButtonText:{
        color:'yellow',
        fontWeight:'bold',
        marginRight:5,
        fontSize:18
    },
    playerList:{
        marginVertical:10,
        paddingHorizontal:30
    },
    ListItem:{
        backgroundColor:'yellow',
        marginVertical:10,
        height:100,
        borderRadius:8,
        borderColor:'white',
        borderWidth:2
    }
});