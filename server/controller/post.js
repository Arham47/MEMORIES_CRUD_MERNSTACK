import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPost=async (req,res)=>{
    console.log("fetchPost")
    try{
          const postMessages = await postMessage.find();

          res.status(200).json(postMessages) 
          
    }catch(error){
          res.status(404).json({message:error.message})
    }
}
export const createPost= async (req,res)=>{
    const post =req.body;
    // console.log(req.body);
    const newPost = new postMessage(post); 
            //  postMessage.deleteMany({})
    try{
      
        await newPost.save();
       res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message:error.message})
       }
}
export const updatePost=async(req,res)=>{
    const {id : _id} =req.params;
    // console.log(_id);
    const post=req.body;
    // console.log(req.body);
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with this id ")

    const updatedPost= await postMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
    console.log(updatedPost);
    res.json(updatedPost);
}
export const deletePost=async(req,res)=>{

const {id:_id} =req.params;

if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with this id ")

const deletedPost=await postMessage.findByIdAndRemove(_id);
res.json({id:_id});


}
export const likePost=async(req,res)=>{
    const {id : _id} =req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("no post with this id ")

    const post= await postMessage.findById(_id);
    const updatedPost=await postMessage.findByIdAndUpdate(_id,{likeCount:post.likeCount+1},{new:true})
    res.json(updatedPost);


}