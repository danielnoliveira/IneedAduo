const axios = require('axios');
const connection = require('../database/connection');
const GetRangeTier = require('../utils/GetRangeTier');
const riot_api = "RGAPI-e4026d31-2f8a-4920-beda-48336b92bcd8";
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
        const tier_solo = league[0]["tier"];
        const rank_solo = league[0]["rank"];
        const tier_flex = league[1]["tier"];
        const rank_flex = league[1]["rank"];

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
        return response.json({very:true,id});
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
        console.log(role);
        const usersByRole = await connection('users').select('*').where('role',role);
        return response.json(usersByRole);
    },
    async indexByEloAndRole(request,response){
        const {page = 1,role} = request.query;
        const {id} = request.body;
        const [count] = await connection('users')
        .count();
        const fila = await connection('users').
        select('tier_solo')
        .where('id',id);
        // console.log(fila);
        const rangeTier = GetRangeTier(fila[0].tier_solo);
        // console.log(rangeTier);
        const players = await connection('users')
        .limit(5)
        .offset((page-1)*5)
        .select('*')
        .whereIn('tier_solo',rangeTier)
        .andWhere('role',role);

        response.header('X-Total-Count',count['count(*)']);
        return response.json(players);
    }
}