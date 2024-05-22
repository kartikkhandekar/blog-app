const userLoginValidations={
    email:{
        exists:{
            errorMessage:'Email is required'
        },
        notEmpty:{
            errorMessage:'Email should not be empty'
        }, 
        isEmail:{
            errorMessage:'invalid email'
        },
         trim:true,
         normalizeEmail:true,
    },
    password:{
            exists:{
                errorMessage:'password is required'
            },
            notEmpty:{
                errorMessage:'username should not be empty'
            },trim:true,
            isLength:{
                options:{min:8,max:128},
                errorMessage:'password should be between 8 to 128'
            }
        }
    
}

module.exports=userLoginValidations