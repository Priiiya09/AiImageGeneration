const cors=require('cors');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const express=require('express');
const PostRouter=require('./routes/Posts');
const ImageRouter=require('./routes/GenerateImage');
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json({limit:"50mb"})); 
app.use(express.urlencoded({extended:true}));
app.use((err,req,res,next)=>{
    const status=err.status || 500; 
    const message=err.message || "something went wrong";
    return res.status(status).json({
        success:false,
        status,
        message
    })
}) 
app.use("/api/post",PostRouter);
app.use("/api/generateImage",ImageRouter);
const connectDb=()=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("MongoDb connected !")
    }).catch((err)=>{
        console.log(err);
    })
}
app.get("/",async (req,res)=>{
    res.status(200).json({
        message:"Hello GFG Developers !"
    });
});
const startServer=async ()=>{
    try{
        connectDb(); 
        app.listen(8080,()=>console.log("Server Started !"));
    }catch(err){
        console.log(err);
    }
}
startServer()