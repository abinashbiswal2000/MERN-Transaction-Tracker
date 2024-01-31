import userAccountModel from "../Models/userAccountModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import mongoose from "mongoose";







export async function createNewAccount (request , response) {
    try {
        const {_id , password} = request.body;
        const newUser = new userAccountModel({
            _id,
            password
        });
        // console.log(`_id = ${_id}`);
        // console.log(`password = ${password}`);

        // console.log(request.body);
        // console.log(typeof request.body);
        // console.table(request.body);

        const savedUser = await newUser.save()

        response.send("Account Created Successfully !")
        console.log("Account Created Successfully !")


    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
        console.log({
            ErrorName: error.name,
            ErrorMessage: error.message
        });
    }
}











export async function login (request , response) {
    try {

        // let expiryDate = new Date();
        // expiryDate.setMinutes(expiryDate.getMinutes() + 1);
        
        const token = jwt.sign(
            { _id: request.body._id },
            process.env.JWT_SECRET_KEY
        );
        response.cookie(
            'token',
            token,
            {
                httpOnly: true
            }    
        ).send("Logged In")

    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
    }
}










export async function logout (request , response) {
    try {
        
        response.cookie(
            'token',
            '',
            {
                httpOnly: true,
                expires: new Date(0)
            }
        ).send('Logged Out')

    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
    }
}













export async function loggedIn (request , response) {
    try {
        const tokenAvailable = request.cookies.token ? true : false;
        response.json({
            LoggedIn: tokenAvailable
        });
    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
    }
}












export function jwtCheck (request , response) {
    try {
        response.send('Working perfectly !')
    } catch (error) {
        response.send('Error Happened')
    }
}










export async function getAllTransactions (request, response) {
    try {
        const userID = jwt.decode(request.cookies.token)._id
        const userData = await userAccountModel.findById({_id: userID});
        // console.log(decoded);
        response.json(userData.transactionDetails);
    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
    }
}












export async function addNewTransaction (request , response) {
    try {
        const _id = jwt.decode(request.cookies.token)._id;
        const updatedData = await userAccountModel.updateOne(
            {_id},
            {$push: {transactionDetails: {
                amount: Number(request.body.amount),
                purpose: request.body.purpose,
                date: new Date(request.body.date),
                transactionType: request.body.transactionType
            }}}
        )
        response.json(updatedData);
    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
    }
}












export async function deleteOneTransaction (request , response) {
    try {
        const _id = jwt.decode(request.cookies.token)._id;
        // console.table({
        //     amount: request.params['Amount'],
        //     date: request.params['Date']
        // })
        const updatedData = await userAccountModel.updateOne(
            {_id},
            {$pull: {transactionDetails: {
                amount: Number(request.params['Amount']),
                date: new Date(request.params['Date'])
            }}}
        )
        response.json(updatedData);
    } catch (error) {
        response.json({
            ErrorName: error.name,
            ErrorMessage: error.message
        })
    }
}