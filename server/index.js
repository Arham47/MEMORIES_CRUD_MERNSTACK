import express from "express";
import bodyParse from "body-parser";
import mongoose from 'mongoose';
import cors from "cors";
import PostRoutes from "./routes/post.js"
import dotenv from "dotenv";

const app=express();
dotenv.config();
app.use(cors());
app.use(bodyParse.json({limit : "30mb", extended : true}));
app.use(bodyParse.urlencoded({limit : "30mb", extended : true}));
app.use('/posts',PostRoutes)



const PORT=process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>app.listen(PORT,()=>console.log(`server is runnine on localhost:${PORT}`)))
.catch((err)=>console.log(err))