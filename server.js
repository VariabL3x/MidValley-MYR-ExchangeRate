const express = require('express');
const getMYRExchangeRate = require('./getMYRExchangeRate');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static('./public'));

let cachedData;
let cachedTime;

app.get('/api/rates',async (req,res)=>{
    // in memory cache
    if(cachedTime && cachedTime > Date.now() - 300 * 1000){
        console.log(cachedTime);
        return res.json(cachedData)
    }
    try {
        const rates = await getMYRExchangeRate();
        cachedTime = Date.now();
        rates.push({cachedTime});
        cachedData = rates;
        return res.json(rates);
    } catch (error) {
        return res.json(error)
    }
    
})

app.listen(PORT,()=>{
    console.log(`App running on http://localhost:${PORT}`);
})
