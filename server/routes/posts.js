import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likedPost } from '../controllers/post.js'
const router = express.Router()


router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
// like post
router.patch('/:id/likedPost',likedPost)


export default router 