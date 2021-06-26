const fs=require('fs');
const sharp=require('sharp');

const imageProcess=async (req,id)=>{
    fs.access('./data/uploads',(err)=>{
        if(err){
            fs.mkdirSync('./data/uploads')
        }
        //data klasörü içerisinde uploads varmı kontrol eder
        //eğer yoksa yani bir hata verirse,data içerisine upload oluşturulur.

    })
    const formattedName=req.file.originalname.split(' ').join('-');
    //resim ismi içerisinde boşluklar varsa bunlar '-' ile değiştirilir
    const filename=`${id}-${formattedName}`;
    //postId ve resim isminin birlikte tutulduğu bir filename oluşturuldu.
    
    try {
        await sharp(req.file.buffer).resize({width:615,height:350}).toFile(`./data/uploads/${filename}`)
    //burada req.file.buffer içerisinde ikili kod halinde bulunda image dosyamızı
    //resize metodu yardımıyla yeniden boyutlandırdık daha sonra toFile ile originalname bilgisiyle uploads içerisine eklendi
    } catch (error) {
        console.log('Error while  processing image',error)
    }

    return filename;
    
}

module.exports=imageProcess;