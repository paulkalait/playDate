import express from 'express'
import { signin, signup, getUser, updateUser} from '../controllers/user.js'
const router = express.Router()

// getUsers
// router.get('/', getUsers)

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/:id', getUser) 
router.put('/:id', updateUser);

export default router 