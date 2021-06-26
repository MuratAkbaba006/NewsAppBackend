const express=require('express');
const app=express();
//const News=require('./news/News')
const NewRouter = require('./router/Route');
var cors=require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(express.static('data/uploads'));
app.use('/api',NewRouter); // localhost:5003/api/create ile


app.listen(5003,()=>{
    console.log("Port is Listening");
})