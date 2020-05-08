import React,{useState,useEffect} from 'react';
import { Text, View ,Picker,TouchableOpacity,AsyncStorage} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import styles from './style';
import api from '../../../../services/api';
import storage from '../../../../services/storage';
export default function DuoList(){
    const [role, setrole] = useState('qualquer função');
    const [players,setPlayers] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    async function loadPlayers(){
        if(loading){
            return ;
        }
        if(total>0 && players.length===total){
            return;
        }
        setLoading(true);
        const id = await storage._retrieveData();
        const response = await api.get(`users/search?page=${page}&role=${role}&id=${id}`);
        setPlayers([...players,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }
    function getTierColor(tier){
        const colors = {
            'PLATINUM':'#e5e4e2',
            'IRON':'#a19d94',
            'BRONZE':'#cd7f32',
            'SILVER':'#C0C0C0',
            'DIAMOND':'#b9f2ff',
            'GOLD':'#FFD700'
        }
        return colors[tier]||'white';
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchHeader}>
                <Picker
                    selectedValue={role}
                    style={styles.roleSelector}
                    onValueChange={(itemValue, itemIndex) =>{
                        setrole(itemValue)
                        setPlayers([]);
                        setTotal(0);
                        setPage(1);
                    } }
                >
                    <Picker.Item label="Função do seu duo" value="todos"/>
                    <Picker.Item label="ADC" value="ADC" />
                    <Picker.Item label="SUP" value="SUP" />
                    <Picker.Item label="MID" value="MID" />
                    <Picker.Item label="TOP" value="TOP" />
                    <Picker.Item label="JUNGLE" value="JUNGLE" />
                </Picker>
                <TouchableOpacity 
                            style={styles.searchButton}
                            onPress={loadPlayers}
                            disabled={loading}
                        >
                    <Text style={styles.searchButtonText}>Buscar Duo</Text>
                    <Feather name="search" size={25} color="yellow"/>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.playerList} 
                data={players}
                showsVerticalScrollIndicator={true}
                onEndReached={loadPlayers}
                onEndReachedThreshold={0.4}
                keyExtractor={item => item.id}
                renderItem={({item})=>{
                    return (
                        <View style={[styles.ListItem,{'backgroundColor':getTierColor(item.tier_solo)}]}>
                            <Text>{item.username}</Text>
                            <Text>{item.role}</Text>
                            <Text>{item.tier_solo} {item.rank_solo}</Text>
                            <Text>{item.summonerLevel}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}