const fs = require('fs')
//bu modül dosya ve klasör ile işlem yapmak için çeşitli senkron ve asenkron
//metodlara sahiptir 
class News{
    constructor(filename='news.json'){
        this.path=`./data/${filename}`;

        try{
            fs.readdirSync('data');
            //data klasörünün içeriğini listeler
        }catch(error){
            fs.mkdirSync('data');
            //eğer data klasörü yoksa data klasörünü oluşturur.

        }


        try{
            fs.accessSync(this.path);
            //dosyanın(path) varlığını kontrol eder
        }catch(error){
            fs.writeFileSync(this.path,'[]')
            //gelen filename adında bir dosya oluşur ve içerisinde ikinci parametre ile verilen
            //dizi yazılır.
        }
     
    }
   
    createId(){
        return new Date().getTime().toString();
        //haberin eklendiği tarihe göre milisaniye oalrak bir id verildi.
        //aynı anda birden fazla haber eklenemeyeceği için
        //unique id'ler oluşmuş oldu.
    }
   
    async create(data,id,imageName){
        const totalData= JSON.parse(await fs.promises.readFile(this.path));
        const {content}=data;
        const desc=content.substr(0,100)+'...';
        //burada substr metodu ile en baştan başlayarak 100 harf ve ... şeklinde
        totalData.push({...data,id,desc,thumbnail:`http://192.168.1.4:5003/${imageName}`});
        //create metodu ile gönderilmiş olan data ve id totalDataya eklendi,thum
        await fs.promises.writeFile(this.path,JSON.stringify(totalData,null,2));
        //totalData Jsona çevrilerek tekrar path içerisindeki dosyaya yazılır.
    }

    async getAll(){
        const data= JSON.parse(await fs.promises.readFile(this.path));
         //JSON formatından dönüştürerek alınır
        return data.filter(news=>delete news.content)
        //data içerisindeki contentler olmadan döndürür
    }

    async searchPosts(query){
        try{
            const data=await this.getAll();
            return data.filter(news =>
                news.title.toLowerCase().includes(query.toLowerCase()))
        }
        catch(error){
            console.log('Error while searching post');
        }
    }

    async getSingle(id){
        const data=JSON.parse(await fs.promises.readFile(this.path));
        return data.find((news) => news.id===id)
        //verilen id'ye sahip haberin getirilmesini sağlar
        
    }

    async getByCategory(category){
        const data=await this.getAll();
        return data.filter( (news) => news.category===category)

    }
}

module.exports=News;