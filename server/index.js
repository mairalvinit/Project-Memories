import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
//connecting to routes


app.use(bodyParser.json({limit:"30mb",extendend : true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use('/posts',postRoutes);
//connecting to mongoDB

const MongoDB_URL = process.env.URL|| "mongodb://localhost:27017/MemoriesDB" ; 
const PORT = process.env.PORT || 5000;

mongoose.connect(MongoDB_URL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    .then(()=>
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    }))
    .catch((err)=>{
        console.log("error : ",err.message);
    });

