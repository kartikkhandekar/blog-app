const User=require('../models/user-model')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const { validationResult }=require('express-validator')
const usersCltr={}


usersCltr.register=async(req,res)=>{
   const errors=validationResult(req)
   if(!errors.isEmpty())
   {
       return res.status(400).json({errors:errors.array()})
   }
   try{
      
      const body=req.body
      const salt=await bcryptjs.genSalt()
      const hashPassword=await bcryptjs.hash(body.password,salt)
      const user=await User(body)
      user.password=hashPassword
      await user.save()
      res.json(user)

   }
   catch(error){
      res.json({error:'internal server error'})
   }
}



usersCltr.login = async (req, res) => {
   const errors = validationResult(req) 
   if(!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array()})
   }
   try { 
      const body = req.body 
       const user = await User.findOne({email: body.email }) 
       
       if(user) 
       {
           const isAuth = await bcryptjs.compare(body.password, user.password)

           if(isAuth) 
           {
               const tokenData =
                {
                   id: user._id 
               }
               const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d'})

               return res.json({ token: token })
           }
           return res.status(404).json({ errors: 'invalid email / password '})
       }
       res.status(404).json({ errors: 'invalid email / password'})
   }
    catch(error) {
       res.status(500).json({ errors: 'something went wrong'})
   }
}


usersCltr.account=async(req,res)=>{
   try{

      const user=await User.findById(req.user.id)
      res.status(200).json(user)

   }
   catch(err){
      res.status(400).json({errors:'somthing went wrong'})
   }

}

usersCltr.update=async(req,res)=>{
   const errors=validationResult(req)
   if(!errors.isEmpty())
   {
       return res.status(400).json({errors:errors.array()})
   }
    try{
         const body=req.body
         const salt=await bcryptjs.genSalt()
         const hash=await bcryptjs.hash(body.password,salt)
         body.password=hash
         console.log(hash)
         const user=await User.findOneAndUpdate({_id:req.user.id},body,{new:true})
         res.status(200).json(user)
    }catch(err){
        res.status(400).json({errors:'somthing went wrong'})
    }
}


usersCltr.checkEmail=async(req,res)=>{
   const email=req.query.email
   const user=await User.findOne({email:email})
   if(user){
      res.json({'is_email_registered':true})
   }else{
      res.json({'is_email_registered':false})
   }
}


usersCltr.uploadProfilePicture = async (req, res) => {
   try {
       const userId = req.user.id
       let profilePicture = req.file.path 

       profilePicture = profilePicture.replace(/\\/g, '/')
       const user = await User.findByIdAndUpdate(userId, { profilePicture }, { new: true })
       if (!user) {
           return res.status(404).json({ error: 'User not found' })
       }
       res.status(200).json(user)
   } catch (err) {
       console.log(err)
       res.status(500).json({ error: 'Something went wrong' })
   }
}
module.exports=usersCltr