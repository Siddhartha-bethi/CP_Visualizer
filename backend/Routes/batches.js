const express = require('express');
const { json } = require("express")
const {AddToCollection} = require("../DBInteraction")
const batchModel  = require("../batchModel")
const router=express.Router()

router.post("/postbatches",async (req,res)=>{
    console.log("batch details to post");
    data = req.body
    AddToCollection(batchModel, data);
})

module.exports= router;