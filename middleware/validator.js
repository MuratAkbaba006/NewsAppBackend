const {check,validationResult}=require('express-validator')
//yarn add express-validator

const exceptedCategory=["entertainment","political","tech","breaking-news","sport","science"]

const validator=[
    check('title').trim().not().isEmpty().withMessage('title is required'),
    check('content').trim().not().isEmpty().withMessage('Must have a some content'),
    check('category').isIn(exceptedCategory).withMessage('Select at least one category')
    

]

const result=(req,res,next)=>{
    const result=validationResult(req);
    const hasError=!result.isEmpty();

    if(hasError){
        const error=result.array()[0].msg;
        res.json({success:false,message:error})
    }
    next();
}

const validateFile=(req,res,next)=>{
    //express-validator dosyalar için bir kontrol sağlamıyor
    //bunun için kendimiz bir metot oluşturduk.
    const expectedFileType=['png','jpg','jpeg'];
    if(!req.file){
       return res.json({success:false,message:'Image is required'});
    }
    const fileExtension=req.file.mimetype.split('/').pop();
    //burada req.file.mimetype image/png yada image/jpg gibi
    //bir değer dönderir burda / ile ayırıp pop ile sildiğimizde
    //elimizde resmin uzantısı kalmış olur.
    if(!expectedFileType.includes(fileExtension)){
        return res.json({success:false,message:'Image is not valid'});

    }
    next();
}

module.exports={
    validator,
    result,
    validateFile
}