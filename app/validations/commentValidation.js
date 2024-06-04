const Comment=require('../models/comment-model')
const commentValidations={
    content:{
        in:['body'],
        exists:{
            errorMessage:'content is required'
        },
        notEmpty:{
            errorMessage:'content cannot be empty'
        },
        trim:true
    },
   
}

const commentEditValidation={
  content:{ 
    in:['body'],
    exists:{
    errorMessage:'content is required'
    },
    notEmpty:{
        errorMessage:'content cannot be empty'
    }
  },
 
}

const idValidationSchema={
    post:{
    in:['params'],
    isMongoId:{
        errorMessage:'should be valid mongo id'
    }
}
}
module.exports={commentValidations,commentEditValidation,idValidationSchema}


