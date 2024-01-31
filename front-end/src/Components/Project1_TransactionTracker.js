import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Project1_TransactionTracker() {


    const [allTransactions, setAllTransactions] = useState([]);
    const [purpose, setPurpose] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [transactionType, setTransactionType] = useState('withdraw');
    const [dependency, setDependency] = useState(0)
    const [currentBalance, setCurrentBalance] = useState(0)
    
    const useRefValue = useRef(0)


    // async function getAllTransactions() {
    //     try {
    //         const allFetchedTransaction = await axios.get('http://localhost:5000/user/GetAllTransactions')
    //         setAllTransactions(allFetchedTransaction.data)
    //         console.log(allFetchedTransaction.data);
    //     } catch (error) {
    //         console.table({
    //             ErrorName: error.name,
    //             ErMessageame: error.message,
    //         });
    //     }
    // }


    function currentBalanceFunction (transactionArray) {
        let balance = 0;
        for (let i of transactionArray) {
            if (i.transactionType === 'withdraw') {
                balance -= i.amount
            } else {
                balance += i.amount
            }
        }

        return balance
    }



    useEffect(
        function () {
            // console.log(`useRefValue.current === 0 = ${useRefValue.current === 0}`);
            // console.log(`Inside UseEffect: useRefValue.current = ${useRefValue.current}`);
            if (useRefValue.current === 0 || dependency !== 0) {
                console.log(`UseEffect is called`);
                async function getAllTransactions() {
                    try {
                        const allFetchedTransaction = await axios.get('http://localhost:5000/user/GetAllTransactions')
                        // console.log(allFetchedTransaction.data);
                        let transactionArray = allFetchedTransaction.data
                        transactionArray = transactionArray.map(function (elem) {
                            let tableClass = '';
                            if (elem.transactionType === "withdraw") {
                                tableClass = 'table table-hover table-danger'
                            } else {
                                tableClass = 'table table-hover table-success'
                            }
                            return {
                                amount: elem.amount,
                                purpose: elem.purpose,
                                date: elem.date,
                                formattedDate: new Date(elem.date),
                                transactionType: elem.transactionType,
                                tableClass
                            }
                        })
                        // console.log(`Hi`);
                        console.log(transactionArray);
                        console.log(currentBalanceFunction(transactionArray));
                        setCurrentBalance(currentBalanceFunction(transactionArray))
                        setAllTransactions(transactionArray.reverse())
                        // console.log(allFetchedTransaction.data);
                    } catch (error) {
                        console.table({
                            ErrorName: error.name,
                            ErMessageame: error.message,
                        });
                    }
                }
                getAllTransactions()
            }
            return (
                function () {
                    if (useRefValue.current === 0) {
                        useRefValue.current = 1;
                    }
                }
            )
        },
        [dependency]
    )




    async function handleSubmit(event) {
        try {
            event.preventDefault()
            const axiosResponse = await axios.post(
                "http://localhost:5000/user/AddNewTransaction",
                {
                    amount: Number(amount),
                    purpose,
                    date,
                    transactionType
                }
            );
            console.log(axiosResponse.data);
            setDependency(function (value) { return value + 1 });
            setAmount('');
            setPurpose('');
            setTransactionType('withdraw');
            setDate(new Date());
        } catch (error) {
            console.table({
                ErrorName: error.name,
                ErMessageame: error.message,
            });
        }
    }








    async function handleDelete(date, amount) {
        try {
            console.log(date);
            console.log(typeof date);
            // console.log(amount);
            // console.log(typeof amount);

            const url = `http://localhost:5000/user/DeleteOneTransaction/${amount}/${date}`
            console.log(url);
            const axiosResponse = await axios.delete(url);
            console.log(axiosResponse.data);

            setDependency(function (value) { return value + 1 })

        } catch (error) {
            console.table({
                ErrorName: error.name,
                ErMessageame: error.message,
            });
        }
    }




    return (
        <>
            {/* <button className='btn btn-secondary btn-lg' onClick={getAllTransactions}>Show Transaction Details</button> */}
            <div className="font-monospace display-1 text-decoration-underline text-center mb-5">Transactions Tracker</div>



            {/* ----------------------------------------------------------------------- */}
            {/* <!-- Button trigger modal --> */}

            <div className="d-grid gap-2 col-6 mx-auto">
                <button type="button" className="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add New Transaction
                </button>
            </div>

            <pre className='text-center fs-3 text-secondary fw-bold border my-5'>Current Balance: {currentBalance}</pre>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add New Transaction</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form action="" className='p-3 mb-5 mx-2 border border-secondary border-3 rounded rounded-3'>
                                {/* <h2>Add Transaction</h2> */}
                                <label htmlFor="transactionType" className="form-label">Transaction Type</label>
                                <select onChange={function (event) { setTransactionType(event.target.value) }} value={transactionType} id='transactionType' className="form-select" aria-label="Default select example">
                                    <option value="withdraw">Withdraw</option>
                                    <option value="deposit">Deposit</option>
                                </select>
                                <br />

                                <label htmlFor="date" className="form-label">Date</label>
                                <input value={date} onChange={function (event) { setDate(event.target.value) }} className='form-control' type="date" name="" id="date" style={{ minWidth: "100%" }} />

                                <br />
                                <label htmlFor="Amount" className="form-label">Amount</label>
                                <input value={amount} onChange={function (event) { setAmount(event.target.value) }} id='Amount' placeholder='Amount' type="number" className="form-control" />
                                <br />
                                <label htmlFor="Purpose" className="form-label">Purpose</label>
                                <input value={purpose} onChange={function (event) { setPurpose(event.target.value) }} id='Purpose' placeholder='Purpose' type="text" className="form-control" />
                                <br />
                                <div className="d-grid gap-3">
                                    <button onClick={handleSubmit} className='btn btn-success btn-lg' type="submit" data-bs-dismiss="modal">Update</button>

                                </div>
                            </form>
                        </div>

                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}

                    </div>

                </div>
            </div>



            {/* ----------------------------------------------------------------------- */}

            {/* <button className="btn btn-dark" onClick={function () { console.log(new Date()) }}>Show Date</button> */}
            <div className='mx-auto px-2' style={{ maxWidth: "700px" }}>
                {
                    allTransactions.map(function (elem) {


                        return (
                            <div className="card my-4" key={elem.date}>
                                <div className="card-body">


                                    <table className={elem.tableClass}>
                                        <thead>
                                            <tr>
                                                <th scope="col">Field</th>
                                                <th scope="col">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Date</td>
                                                <td>{elem.formattedDate.toDateString()}</td>
                                            </tr>
                                            <tr>
                                                <td>Amount</td>
                                                <td>{elem.amount}</td>
                                            </tr>
                                            <tr>
                                                <td>Purpose</td>
                                                <td>{elem.purpose}</td>
                                            </tr>
                                            <tr>
                                                <td>Transaction Type</td>
                                                <td>{elem.transactionType}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                    <button className="btn btn-danger" onClick={function () { handleDelete(elem.date, elem.amount) }}>Delete Record</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}
