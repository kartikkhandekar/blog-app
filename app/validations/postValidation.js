const postValidation={
    title:{
        in:['body'],
        exists:{
            errorMessage:'title is required'
        },
        notEmpty:{
            errorMessage:'title should not be empty'
        },
        trim:true,
    },
    content:{
        exists:{
            errorMessage:'content is required'
        },
        notEmpty:{
            errorMessage:'content should not be empty'
        },
        trim:true,
    },
   
}

const postEditValidation={
    title:{
        in:['body'],
        exists:{
            errorMessage:'title is required'
        },
        notEmpty:{
            errorMessage:'title should not be empty'
        },
        trim:true,
    },
    content:{
        exists:{
            errorMessage:'content is required'
        },
        notEmpty:{
            errorMessage:'content should not be empty'
        },
        trim:true,
    },
   
   
}



module.exports={postValidation,postEditValidation}