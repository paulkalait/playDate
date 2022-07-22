import express from 'express'


import { signIn, signUp, getUsers} from '../controllers/user.js'
const router = express.Router()

router.get('/', getUsers)
router.post('/signin', signIn)
router.post('/signup', signUp)

export default router 