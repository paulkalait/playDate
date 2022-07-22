import express from 'express'
const router = express.Router()

import { signin, signup } from '../controllers/user.js'


// getUsers
// router.get('/', getUsers)

router.post('/signin', signin)
router.post('/signup', signup)

export default router 