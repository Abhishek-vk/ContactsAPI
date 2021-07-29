var express = require('express');
var cors = require('cors');
var fs = require('fs');

var app=express();
app.use(cors());
app.use(express.json());

const port=8000;
const urlPath='/api/v1/contacts';
var data=JSON.parse(fs.readFileSync('./data/Contacts.json'));

app.get(urlPath,(req,res)=>{
    res.status(200).json({
        status:'Success',
        statusCode:200,
        total:data.length,
        data});
});

app.post(urlPath,(req,res)=>{
    res.status(200).json({status:'Success',statusCode:200,addedData:req.body});
})

app.listen(port,()=>{
    console.clear();
    console.log('Server started at port 8000');
});