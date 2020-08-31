const express = require('express');
const getMYRExchangeRate = require('./getMYRExchangeRate');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(express.static('./public'));

app.get('/api/rates',async (req,res)=>{
    const rates = await getMYRExchangeRate();

    res.json(rates);
})

app.listen(PORT,()=>{
    console.log(`App running on http://localhost:${PORT}`);
})
