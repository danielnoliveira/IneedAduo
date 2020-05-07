const axios = require('axios');
const connection = require('../database/connection');
const GetRangeTier = require('../utils/GetRangeTier');
const riot_api = require('../api_keys/riot_api').getRiotApiKey();
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
        const users = await connection('users').select(['username','email','summonerLevel','tier_solo','rank_solo']);
        return response.json(users);
    },
    async getUserByID(request,response){
        const {id} = request.body;
        const user = await connection('users')
        .select('*')
        .where('id',id);
        return response.json(user[0]);
    },
    async create(request,response){
        console.log("Criação de usuario solicitado");
        const {username,role,email,whatsapp,password} = request.body;
        try{
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
    
            var tier_solo='-';
            var rank_solo='-';
            var tier_flex='-';
            var rank_flex='-';
            if(league.lenght!=0){
                for(liga of league){
                    if(liga.queueType=="RANKED_SOLO_5x5"){
                        tier_solo = liga.tier;
                        rank_solo = liga.rank;
                        break;
                    }
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
        }catch(ex){
            return response.json({very:false});
        }
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
        const {page = 1,role} = request.query;
        const {id} = request.body;
        
        const me = (await connection('users').
        select('*')
        .where('id',id))[0];
        
        const rangeTier = GetRangeTier(me.tier_solo);

        const [count] = await connection('users')
        .select('*')
        .whereIn('tier_solo',rangeTier)
        .andWhere('role',role)
        .andWhereNot('id',id)
        .count();

        const players = await connection('users')
        .limit(5)
        .offset((page-1)*5)
        .select('*')
        .whereIn('tier_solo',rangeTier)
        .andWhere('role',role)
        .andWhereNot('id',id);

        response.header('X-Total-Count',count['count(*)']);
        return response.json(players);
    },
    async Logar(request,response){
        const {email,password} = request.body;
        const user = await connection('users')
        .select('*')
        .where({
            email,
            password
        });
        return response.json({"very":(user.length==1?true:false),"id":user[0].id});
    } 
}
