const axios = require("axios")
const Mschema = require("./CryptoModel");
const { response } = require("express");
const coins = ["bitcoin", "ethereum", "matic-network"];

async function storeCryptoStats() {
    try {
        const getcoin = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                id: coins.join(','),
                curr: "usd",
                marketcap: 'true',
                usd_24h_change: 'true'
            }

        });
        const data = getcoin.data;
        const records = coins.map((coin) => {
            coin;
            price: data[coin]?.usd;
            marketCap: data[coin]?.usd_market_cap;
            change24h: data[coin]?.usd_24h_change;
            timestamp: new Date();
        });

        await Mschema.insertMany(records);
        console.log("added");
    } catch (error) {
        console.error("error", error.msg);
    }




}