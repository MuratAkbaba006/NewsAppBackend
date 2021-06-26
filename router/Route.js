const express=require('express');
const router=express.Router();
const uploads=require('../middleware/multer')
const {createNews,getAllNews,getSingleNews,getNewsByCategory,searchPosts} =require('../controllers/NewsController')
const {validator,result,validateFile}=require('../middleware/validator')




router.post('/create',uploads.single('thumbnail'),validator,result,validateFile,createNews);
    //burada post metoduna ikinci parametre olarak upload olmasını istediğimiz
    //dosyanın ismini verdik.
    //üçüncü parametre olan validatorden sonra resulta gidecek eğer bir hata varsa
    //hatayı yazdıracak bir hata yoksa ise bir sonraki işleme yani createNews'e devam edecek
   
router.get('/news',getAllNews);
router.get('/news/single/:id',getSingleNews);   
router.get('/news/:category/:qty?',getNewsByCategory)
router.post('/news/search/:query',searchPosts);

module.exports=router;