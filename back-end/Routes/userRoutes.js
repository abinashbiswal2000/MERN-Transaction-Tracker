import express from 'express';
import { 
    createNewAccount ,
    login,
    logout,
    loggedIn,
    jwtCheck,
    getAllTransactions,
    addNewTransaction,
    deleteOneTransaction
} from '../Controllers/userControllers.js';

import { 
    validateUser,
    hashPassword,
    authenticateUser,
    authorizeUser
} from '../Middlewares/userMiddlewares.js';




const router = express.Router();




router.post('/CreateNewAccount' , validateUser , hashPassword , createNewAccount);
router.post('/Login' , authenticateUser , login);
router.get('/Logout' , logout);
router.get('/LoggedIn' , loggedIn);
router.get('/JwtCheck' , authorizeUser , jwtCheck);

router.get('/GetAllTransactions' , authorizeUser , getAllTransactions)
router.post('/AddNewTransaction' , authorizeUser , addNewTransaction)
// router.post('/DeleteOneTransaction' , authorizeUser , deleteOneTransaction)
router.delete('/DeleteOneTransaction/:Amount/:Date' , authorizeUser , deleteOneTransaction)



export default router;