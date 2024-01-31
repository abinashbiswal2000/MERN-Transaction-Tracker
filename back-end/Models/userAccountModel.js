import mongoose from 'mongoose';




const schema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    transactionDetails: {
        type: [Object],
        required: false
    }
});




const userAccountModel = mongoose.model("User-Account" , schema);




export default userAccountModel;