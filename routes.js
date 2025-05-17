const express=require("express");
const storeCryptoStats=require("./storeCryptoStats")
const Mschema =require("./CryptoModel")
const app=express();

app.get("/stats",async (req,res)=>{
    const {coin}=req.query;
    const latest=await Mschema.findOne({coin}).sort({timestamp:-1});
    if(!latest) return res.status(404).send("not found");
    res.json({
        price:latest.price,
        marketcap:latest.marketcap,
        hourchange:latest.hourchange
    })
})

app.get('/deviation',async (req,res)=>{
    const coin=req.query;
    const records=await Mschema.findOne({coin}).limit(100);
    const prices=records.map(r=>r.price);
    const mean =prices.reduce((a,b)=>a+b)/prices.length;
    const variance=prices.reduce((a,b)=>a+(b-mean)**2,0)/prices.length;
    const stddev=Math.sqrt(variance);
    res.json({deviation:Number(stddev.toFixed(2))});

});
app.listen(3000,()=>console.log("running 3000"));