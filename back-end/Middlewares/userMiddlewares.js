import Joi from "joi";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userAccountModel from "../Models/userAccountModel.js";




export async function validateUser (request , response , next) {
    // Joi Validation
    try {
        const joiSchema = Joi.object({
            _id: Joi
                    .string()
                    .required(),

            password: Joi
                        .string()
                        .required()
                        .min(3)
        })
        const validationResult = await joiSchema.validateAsync(request.body)
        // console.log(validationResult);
        next()

    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
    }
}






export async function hashPassword (request, response, next) {
    // Hashing Passwords using bcryptjs
    try {

        const hashedPassword = await bcrypt.hash(request.body.password ,10 );
        request.body.password = hashedPassword;
        next()

    } catch (error) {

        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })

    }
}









export async function authenticateUser (request, response, next) {
    try {
        const { _id  , password } = request.body;
        const foundUser = await userAccountModel.findOne({_id});
        if (foundUser === null) {throw error}

        const comparePasswords = await bcrypt.compare(password , foundUser.password);
        if (comparePasswords === false) {throw error}
        // response.send("Authorized")
        next()


    } catch (error) {
        response.send("Authentication Failed")
    }
}












export async function authorizeUser (request , response , next) {
    try {
        const token = request.cookies.token;
        if (!token) {throw new error}
        const verification = jwt.verify(token , process.env.JWT_SECRET_KEY)
        next();
    } catch (error) {
        // response.json({
        //     errorName: error.name,
        //     errorMessage: error.message
        // })
        response.send('Unauthorized')
    }
}







