import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import router from './Routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';






const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use('/user' , router)







async function connectToDb (port) {
    try {

        await mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
        app.listen(port , function(){console.log(`App listening at http://localhost:${port}`);});

    } catch (error) {

        console.log(`Connection Failed`);

    }
}






const PORT = process.env.PORT || 5000;






connectToDb(PORT)