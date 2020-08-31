const cheerio = require('cheerio');
const request = require('request-promise');

// Mid valley exchange rate url 
const page_url = 'https://www.exchangerate.my/currency-exchange-rates/Max-Money-Changer-Mid-Valley';

async function getMYRExchangeRate(){

    const config = {
        uri:page_url,
        headers:{
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-encoding': 'gzip',
            'accept-language': 'en-US,en;q=0.9',
            'cache-control': 'max-age=0',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'cross-site',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
        },
        gzip:true,

    }
    const response = await request(config);

    const $ = cheerio.load(response);

    const table = $('div[class=ratesTable] > table');

    const exchangeRates = [];
    table.find('tbody > tr').slice(1).each((i,row)=>{
        const $row = $(row);

        const rate = {};

        const labels = [
            'Unit',
            'Sell',
            'Buy'
        ]

        const value = $row.find('td').first().text().trim();

        rate.Currency = value.substring(0,3);  //$row.find('td b').first().text().trim();

        rate.CurrencyName = value.substring(3);  //$row.find('td').first().text().trim();

        let offset = 0;
        
        $row.find('td').slice(1).each((i,element)=>{
            const $col = $(element);
            const value = $col.text().trim();

            if(value === '-'){
                offset += 1;
            }else{
                const label = labels[i - offset];
                rate[label] = Number(value);
            }

        })
        exchangeRates.push(rate);
    })
    return exchangeRates;
} 


module.exports = getMYRExchangeRate;