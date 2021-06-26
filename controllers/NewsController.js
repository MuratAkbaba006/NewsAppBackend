const imageProcess=require('../util/imageProcess');
const News=require('../news/News')
const news=new News();

const createNews= async(req,res)=>{
    const id=news.createId();

    try {
        const imageName=await imageProcess(req,id);
        //imageProcess'den return edilen filename aldık ve imageName olarak kaydettik.
        news.create(req.body,id,imageName);
        res.json({success:true,message:'Post created successfull'})
    } catch (error) {
        res.json({success:false,message:'Something went wrong,server error!'})
        
    }
   
}

const getAllNews= async (req,res)=>{
    try{
        const data=await news.getAll();
        res.json({success:true,news:data})
    }catch(err){
        res.json({
            success:false,
            message:'Something went wrong,Server Error !!'
        });
        console.log('Error while getting all news',err.message)
    }
}

const getSingleNews=async (req,res)=>{
    try {
        const data=await news.getSingle(req.params.id);
        if(!data){
            return res.json({
                success:false,
                message:'Post not found'
            });

        }
        res.json({
            success:true,
            news:data
        })
    } catch (error) {
        res.json({
            success:false,
            message:'Something went wrong,Server Error !!'
        });
        console.log('Error while getting single news',error.message)
    }
}

const getNewsByCategory= async (req,res)=>{
    try {
        const {category,qty} = req.params;
        const data=await news.getByCategory(req.params.category);
        if(!data){
            return res.json({
                success:false,
                message:'Post not found'
            });

        }
        if(qty){
            return res.json({success:true,news:[...data].splice(0,qty)})
        }
        res.json({
            success:true,
            news:data
        })
    } catch (error) {
        res.json({
            success:false,
            message:'Something went wrong,Server Error !!'
        });
        console.log('Error while getting news by category',error.message)
    }
}

const searchPosts=async (req,res)=>{
    try{
        const response=await news.searchPosts(req.params.query);
        if(response.length===0){
            return res.json({success:false,message:'Not match found...'});

        }
        res.json({success:true,news:response});

    }
    catch(error){
        res.json({
            success:false,
            message:'Something went wrong,Server Error'
        })
    }
}

module.exports={
    createNews,
    getAllNews,
    getSingleNews,
    getNewsByCategory,
    searchPosts
}