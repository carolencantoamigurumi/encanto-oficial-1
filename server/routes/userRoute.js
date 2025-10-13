import express from 'express'
import { addUserRating, addUserReview, getFavorites, getUserData, updateFavorite } from '../controllers/userController.js'
import { protectUser } from '../middlewares/Auth.js'


const userRouter = express.Router()

userRouter.get('/data', protectUser, getUserData)
userRouter.post('/update-favorite', updateFavorite)
userRouter.get('/favorites', getFavorites)
userRouter.post('/add-rating', addUserRating)
userRouter.post('/add-review', addUserReview)

export default userRouter