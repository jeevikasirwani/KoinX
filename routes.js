const express=require("express");
const storeCryptoStats=require("./storeCryptoStats")
const Mschema =require("./CryptoModel")
const app=express();

app.get("/stats",async (req,res)=>{
    const {coin}=req.query;
    const 
})