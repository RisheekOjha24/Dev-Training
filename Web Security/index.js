const express=require('express');
const app=express();
const Port=5600;
app.listen(Port,()=> console.log("application is running"));

app.get('/',(req,res)=>{
    res.send("Welcome to the new tutorial")
})

