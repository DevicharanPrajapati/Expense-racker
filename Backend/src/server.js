import express from "express";
import dotenv from 'dotenv';


const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res)=>{
  res.send('Hollo world');

})


app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})