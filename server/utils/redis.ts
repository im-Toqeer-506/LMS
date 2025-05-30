import {Redis} from 'ioredis';
require('dotenv').config();
const redisClent= ()=>{
    if(process.env.REDIS_URL){
       console.log(`Redius Conncted to ${process.env.REDIS_URL}`);
       return process.env.REDIS_URL;
    }
    throw new Error('Redis Connection Faild');
}
export const redis =new Redis(redisClent())