import express from 'express'
import { getPosts, getPost, createPost, updatePost, deletePost, likePost, commentPost, getPostBySearch, giveTreat, getSize, getPopular } from '../controllers/post.js'
const router = express.Router()


//import middleware
import auth from '../middleware/auth.js'
//auth  checks if the user is signed up

router.get('/search', getPostBySearch )
router.get('/', getPosts)
router.get('/filter', getSize)
router.get('/popular', getPopular)
router.get('/:id', getPost)
router.post('/', auth,createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
// like post
router.patch('/:id/likePost', auth, likePost)
router.post('/:id/commentPost', auth, commentPost)
router.patch('/:id/treat', auth, giveTreat)


export default router 