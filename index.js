import express from 'express';
import dotenv from 'dotenv';
import conn from './src/config/db.js';
import cloudinary from './src/config/cloudinary.js';
import router from './src/router/router.js';
import cors from "cors"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

conn.connect()
.then(()=>{
    console.log("Database connection successfully"); 
})
.catch((err)=>{
    console.log("Database connection fialed",err);
    
})
// function

async function checkCloudinary() {
    try{
        const connection = await cloudinary.api.ping();
        console.log("cloudinary connection success",connection);
        
    }catch(err){
        console.log("cloudinary connection fialed",err);
    }
    
}checkCloudinary();

app.use(express.json());
app.use(cors());
app.use('/products',router);


app.listen(PORT,() => {console.log(` Server running at http://localhost:${PORT}`);
});

