import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CreateNewAccount() {


    const [loginID, setLoginID] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setvVerifyPassword] = useState("");
    // const [accountCreated, setAccountCreated] = useState(false)
    // const [passwordsNotMatching, setPasswordsNotMatching] = useState(false)
    // const [accountUsed, setAccountUsed] = useState(false)
    const [accountCreated, setAccountCreated] = useState(false);
    const [accountNotCreated, setAccountNotCreated] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');



    async function handleCreateNewAccount(event) {
        try {
            event.preventDefault();
            // console.table({
            //     loginID,
            //     password,
            //     verifyPassword
            // })
            if (password !== verifyPassword) {
                setAccountNotCreated(true);
                setAlertMessage("Passwords Not Matching")
                setTimeout(
                    function () { setAccountNotCreated(false) },
                    2000
                )
            } else {
                const savedData = await axios.post(
                    'http://localhost:5000/user/CreateNewAccount',
                    {
                        _id: loginID,
                        password
                    }
                )


                if (savedData.data.ErrorMessage) {
                    if (savedData.data.ErrorMessage.search('password') > -1) {
                        setAccountNotCreated(true);
                        setAlertMessage("Passwords Should Have atleast 3 Characters")
                        setTimeout(
                            function () { setAccountNotCreated(false) },
                            2000
                        )
                    } else if (savedData.data.ErrorMessage.search('E11000') > -1) {
                        setAccountNotCreated(true);
                        setAlertMessage("This ID is already used")
                        setTimeout(
                            function () { setAccountNotCreated(false) },
                            2000
                        )
                    } else if (savedData.data.ErrorMessage.search('\"_id\"') > -1) {
                        
                        setAccountNotCreated(true);
                        setAlertMessage("Login Id Should not be Empty")
                        setTimeout(
                            function () { setAccountNotCreated(false) },
                            3000
                        )
                    }
                } else {
                    setAccountCreated(true);
                    setAlertMessage("Account Created Successfully")

                }

            }
        } catch (error) {
            console.table({
                ErrorName: error.name,
                ErrorMessage: error.message
            });
        }
    }



    return (
        <div className='p-2'>
            <form onSubmit={handleCreateNewAccount} className='shadow mx-auto mt-3 p-3 border border-3 rounded' style={{ maxWidth: "400px" }}>

                <div style={{ height: "70px" }}>
                    {
                        accountCreated &&
                        // <div className="text-center alert alert-success" role="alert">
                        //     Account Created
                        // </div>
                        <div className="text-center alert alert-success alert-dismissible fade show" role="alert">
                            Account Created
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    }
                    {
                        accountNotCreated &&
                        <div className="text-center alert alert-danger" role="alert">
                            {alertMessage}
                        </div>
                    }

                </div>

                <label htmlFor="Login ID" className="form-label">Login ID</label>
                <input value={loginID} onChange={function (event) { setLoginID(event.target.value) }} type="text" id='Login ID' className="form-control" placeholder='Login ID' />

                <br />

                <label htmlFor="Password" className="form-label">Password</label>
                <input value={password} onChange={function (event) { setPassword(event.target.value) }} type="password" id='Password' className="form-control" placeholder='Password' />

                <br />
                <label htmlFor="Confirm Password" className="form-label">Confirm Password</label>
                <input value={verifyPassword} onChange={function (event) { setvVerifyPassword(event.target.value) }} type="password" id='Confirm Password' className="form-control" placeholder='Re-Enter Password' />

                <br />

                <div className="d-grid gap-3">
                    <button type="submit" className='btn btn-primary'>Register</button>
                    <Link to='/Project/Login' className='btn btn-primary'>Go Back to Login Page</Link>
                </div>

            </form>

        </div>
    )
}
