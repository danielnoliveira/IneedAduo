const axios = require('axios');
const connection = require('../database/connection');
const GetRangeTier = require('../utils/GetRangeTier');
const riot_api = "RGAPI-a87b7887-e146-4ce3-869c-be5e77c05a05";
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
module.exports = {
    async index(request,response){
        const users = await connection('users').select('*');
        return response.json(users);
    },
    async create(request,response){
        const {username,role,email,whatsapp,password} = request.body;
        const {data} = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`,{
            headers:{
                "X-Riot-Token": riot_api,
            }
        });
        const {id,summonerLevel,accountId,puuid} = data;
        
        const {data:league} = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`,{
            headers:{
                "X-Riot-Token":riot_api,
            }
        });
        let tier_solo;
        let rank_solo;
        let tier_flex;
        let rank_flex;
        if (league.lenght==0) {
            tier_solo='-';
            rank_solo='-';
            tier_flex='-';
            rank_flex='-';
        }else{
            if (league[0]["queueType"]=="RANKED_FLEX_SR") {
                tier_flex = league[0]['tier'];
                rank_flex = league[0]["rank"];
                tier_solo = league[1]["tier"];
                rank_solo = league[1]["rank"];
            } else {
                tier_flex = league[1]['tier'];
                rank_flex = league[1]["rank"];
                tier_solo = league[0]["tier"];
                rank_solo = league[0]["rank"];
            }
        }

        await connection('users').insert({
            id,
            username,
            role,
            email,
            whatsapp,
            password,
            summonerLevel,
            accountId,
            puuid,
            rank_flex,
            tier_flex,
            rank_solo,
            tier_solo,
        });
        return response.json({very:true});
    },
    async userExists(request,response){
        const {name} = request.query;
        try{
            const result = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,{
                headers:{
                    "X-Riot-Token": riot_api,
                }
            });
            // console.log(result.data);
            return response.json({very:true});
        }catch(err){
            return response.json({very:false});
        }
       
    },
    async indexRole(request,response){
        const {role} = request.params;
        const usersByRole = await connection('users').select('*').where('role',role);
        return response.json(usersByRole);
    },
    async indexByEloAndRole(request,response){
        const {page = 1,role,queueType} = request.query;
        const {id} = request.body;
        
        const queue = queueType=="rankedSoloDuo"?'tier_solo':'tier_flex';
        
        const fila = await connection('users').
        select(queue)
        .where('id',id);
        
        const rangeTier = GetRangeTier(queueType=="rankedSoloDuo"?fila[0].tier_solo:fila[0].tier_flex);
        const [count] = await connection('users')
        .select('*')
        .whereIn(queue,rangeTier)
        .andWhere('role',role)
        .andWhereNot('id',id)
        .count();

        const players = await connection('users')
        .limit(5)
        .offset((page-1)*5)
        .select('*')
        .whereIn(queue,rangeTier)
        .andWhere('role',role)
        .andWhereNot('id',id);

        response.header('X-Total-Count',count['count(*)']);
        return response.json(players);
    },
    async Logar(request,response){
        const {username,password} = request.body;
        const user = await connection('users')
        .select('*')
        .where({
            username,
            password
        });
        return response.json({"very":user.length==1?true:false,"id":user.id});
    } 
}