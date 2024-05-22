require('dotenv').config()
const express=require('express')
const mongoose=require('./config/db')
const {checkSchema}=require('express-validator')
const userLoginValidations=require('./app/validations/user-login')
const {userValidationSchema,userEditValidations}=require('./app/validations/user-register')
const {postValidation,postEditValidation}=require('./app/validations/postValidation')
const {commentValidations,commentEditValidation,idValidationSchema}=require('./app/validations/commentValidation')
const usersCltr=require('./app/controllers/usersCltr')
const postCltr=require('./app/controllers/postCltr')
const commentCltr=require('./app/controllers/commentCltr')
const authentication=require("./app/middlewares/authentication")
const cors=require('cors')
const app= express()
mongoose()
app.use(express.json())
app.use(cors())


app.post('/api/users/register',checkSchema(userValidationSchema),usersCltr.register)
app.post('/api/users/login',checkSchema(userLoginValidations),usersCltr.login)
app.get('/api/users/profile',authentication,usersCltr.account)
app.put('/api/users/profile',authentication,checkSchema(userEditValidations),usersCltr.update)


app.get('/api/posts',postCltr.posts)
app.get('/api/posts/myPosts',authentication,postCltr.myPosts)
app.get('/api/posts/:id',postCltr.single)
app.post('/api/posts',authentication,checkSchema(postValidation),postCltr.create)
app.put('/api/posts/:id',authentication,checkSchema(postEditValidation),postCltr.update)
app.delete('/api/posts/:id',authentication,postCltr.delete)


app.post('/api/posts/:postId/comments',authentication,checkSchema(commentValidations),commentCltr.create)
app.get('/api/posts/:postId/comments',commentCltr.comments)
app.put('/api/posts/:postId/comments/:commentId',authentication,checkSchema(commentEditValidation),commentCltr.update)
app.delete('/api/posts/:postId/comments/:commentId',authentication,commentCltr.delete)

app.listen(process.env.PORT,()=>{
    console.log('connected to server ',5555)
})