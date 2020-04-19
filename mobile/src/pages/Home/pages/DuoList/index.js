import React,{useState} from 'react';
import { Text, View ,Picker,TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import styles from './style';
export default function DuoList(){
    const [role, setrole] = useState('qualquer função');
    const [players,setPlayers] = useState([
        {id:'1',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'2',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'3',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'4',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'5',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'6',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'7',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'8',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'9',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'10',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'11',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
        {id:'12',summonerLevel:'168',username:'Bob',elo:'ouro IV'},
    ]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    // async function loadPlayers(){
    //     if(loading){
    //         return ;
    //     }
    //     if(total>0 && incidents.length===total){
    //         return;
    //     }
    //     setLoading(true);
    //     const response = await api.get('user',{
    //         params:{page}
    //     });
        
    //     setPlayers([...players,...response.data]);
    //     setTotal(response.headers['x-total-count']);
    //     setPage(page+1);
    //     setLoading(false);
    // }
    // useEffect(()=>{
    //     loadPlayers();
    // },[]);
    return (
        <View style={styles.container}>
            <View style={styles.searchHeader}>
                <Picker
                    selectedValue={role}
                    style={styles.roleSelector}
                    onValueChange={(itemValue, itemIndex) => setrole(itemValue)}
                >
                    <Picker.Item label="Função do seu duo" value="todos"/>
                    <Picker.Item label="ADC" value="ADC" />
                    <Picker.Item label="SUP" value="SUP" />
                    <Picker.Item label="MID" value="MID" />
                    <Picker.Item label="TOP" value="TOP" />
                    <Picker.Item label="JUNGLER" value="JUNGLER" />
                </Picker>
                <TouchableOpacity 
                            style={styles.searchButton}
                            onPress={()=>{}}
                        >
                    <Text style={styles.searchButtonText}>Buscar Duo</Text>
                    <Feather name="search" size={25} color="yellow"/>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.playerList} 
                data={players}
                showsVerticalScrollIndicator={true}
                keyExtractor={item => item.id}
                renderItem={({item:player})=>{
                    console.log(player);
                    return (
                        <View style={styles.ListItem}>

                            <Text>{player.elo}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}