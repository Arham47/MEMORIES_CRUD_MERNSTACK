import  express  from "express";
import { deletePost, getPost, likePost, updatePost } from "../controller/post.js";
import { createPost } from "../controller/post.js";
const router=express.Router();


router.get('/',getPost)
router.post('/',createPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/postLikes',likePost)

export default router;