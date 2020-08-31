const currencyEle = document.querySelector('#curr');
const infoEle = document.querySelector('#info');

function setExchangeRate(rates){
    const USD = rates[0];
    rates.forEach(rate => {
        if(rate.Currency){
            const optionEle = document.createElement('option');
            optionEle.setAttribute('value',rate.Currency);
            optionEle.textContent = rate.Currency;
            currencyEle.append(optionEle);
        }
    });
    currencyEle.addEventListener('change',(event)=>{
        const currency = event.target.value;
        const rate = rates.find((f=>f.Currency === currency));
        infoEle.innerHTML = `<pre>${JSON.stringify(rate,null,2)}</pre>`
    })

    infoEle.innerHTML = `<pre>${JSON.stringify(USD,null,2)}</pre>`
}

async function getMYRExchangeRate(){
    const response = await fetch('/api/rates');
    const rates = await response.json();
    setExchangeRate(rates);
}

getMYRExchangeRate();