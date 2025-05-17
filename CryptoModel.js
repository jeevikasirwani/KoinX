const mongoose = require("mongoose");
mongoose.connect("url");
const Mschema = new mongoose.Schema({
    coin: String,
    price: Number,
    usd_market_cap: Number,
    usd_24h_change: Number

})

export default Mschema;