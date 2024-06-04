const Comment=require('../models/comment-model')
const Post=require('../models/post-model')
const {validationResult}=require('express-validator')
const commentCltr={}

commentCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body=req.body
        const postId=req.params.postId
        const comment=new Comment(body)
        comment.author=req.user.id
        comment.post=postId
        await comment.save()
        const updatedPost = await Post.findByIdAndUpdate(postId, { $push: { comment: comment._id } }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(comment);
    }catch(err){
        res.status(500).json({errors:'somthing went wrong'})
    }
}

commentCltr.comments=async(req,res)=>{
    try{
        const postId=req.params.postId
       const comment=await Comment.find({post:postId})
       if(!comment){
        return res.status(404).json({errors:'record not found'})
       }
       res.status(200).json(comment)
    }catch(err){
       res.status(500).json({errors:'somthing went wrong'})
    }
}

commentCltr.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const postId=req.params.postId
        const commentId=req.params.commentId
        const body=req.body
        const comment=await Comment.findOneAndUpdate({_id:commentId,author:req.user.id},body,{new:true})
        if(!comment){
            return res.status(404).json({errors:'record not found'})
        }
        res.status(200).json(comment)
    }catch(err){
        res.status(500).json({errors:'somthing went wrong'})
    }
}

commentCltr.delete=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const postId=req.params.postId
        const commentId=req.params.commentId
        const comment=await Comment.findOneAndDelete({_id:commentId,author:req.user.id},{new:true})
        if(!comment){
            return res.status(404).json({errors:'record not found'})
        }
        await Post.findByIdAndUpdate(postId, { $pull: { comment: commentId } });

        res.status(200).json({msg:'Deleted successfully!!'})
    }catch(err){
        res.status(500).json({errors:'somthing went wrong'})
    }
}

module.exports=commentCltr







