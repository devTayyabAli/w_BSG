import React, { useEffect, useState } from 'react'

import "./Stack_d.css"
import d from "../Assets/d.png"
import d1 from "../Assets/d1.png"
import d2 from "../Assets/d2.png"
import d3 from "../Assets/d3.png"
import Deposite_m from '../Deposite_m/Deposite_m'
import Button from 'react-bootstrap/Button';
import Withdraw_m from '../Withdraw_m/Withdraw_m'
import Split_m from '../Split_m/Split_m'
import { financeAppContractAddress, financeAppContract_Abi, financeAppTokenAddress, financeAppTokenAbi } from '../../utilies/Contract';
import { loadWeb3 } from '../../apis/api';
import Web3 from 'web3'
import { toast } from 'react-toastify';
import Register from '../Register/Register'

function Stack_d() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [loader, setloader] = useState(false)
    const [loaderr, setloaderr] = useState(false)
    const [accadress, setaccadress] = useState('')

    const getDetail = async () => {
        let acc = await loadWeb3();
        if (acc == "No Wallet") {
            // toast.error("No Wallet Connected")
        }
        else if (acc == "Wrong Network") {
            // toast.error("Wrong Newtwork please connect to Polygon MainNet ")
        } else {
            setaccadress(acc)

        }
    }
    useEffect(() => {
        getDetail()

    });
    const depositAmount = async (value) => {
        try {
            const web3 = window.web3;
            let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
            let val = web3.utils.toWei(value);
            let financeAppTokenOf = new web3.eth.Contract(financeAppTokenAbi, financeAppTokenAddress);
            const approveBlock = window.web3.eth.getBlock("latest");
            console.log('approveBlock', approveBlock)
            let approve = await financeAppTokenOf.methods.approve(financeAppContractAddress, (val)).send({
                from: accadress,
                // gasLimit: approveBlock.gasLimit,
                // gasPrice: await window.web3.eth.getGasPrice(),
            });
            let depositAmount = await financeAppcontractOf.methods.deposit(val).send({
                from: accadress,
                //  gasLimit: approveBlock.gasLimit,
                //  gasPrice: await window.web3.eth.getGasPrice(),
            });
            toast.success("Successfully Deposit")
            setModalShow2(false)

            setModalShow3(false)
            setModalShow(false)
            setModalShow1(false)
        }
        catch (e) {
            // toast.error(e.messasge)
            console.log(e.messasge);
            setModalShow2(false)

            setModalShow3(false)
            setModalShow(false)
            setModalShow1(false)
        }
    }
    const withdrawAmount = async () => {
        setloader(true)
        try {
            const web3 = window.web3;
            let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
            const approveBlock = window.web3.eth.getBlock("latest");
            let withdrawAmount = await financeAppcontractOf.methods.withdraw().send({
                from: accadress,
                //  gasLimit: approveBlock.gasLimit,
                //  gasPrice: await window.web3.eth.getGasPrice(),
            });
            setloader(false)
            setModalShow2(false)

            setModalShow3(false)
            setModalShow(false)
            setModalShow1(false)
            toast.success("successfully withdraw")
        }
        catch (e) {
            // toast.error(e.messasge)
            console.log(e.messasge);
            setloader(false)
            setModalShow2(false)

            setModalShow3(false)
            setModalShow(false)
            setModalShow1(false)
        }
    }
    const splitAmount = async (value) => {
        let acc = await loadWeb3();
        try {
            const web3 = window.web3;
            let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);

            // toast(value.stdAmount)

            if (value.stdAmount) {
                try {
                    setloader(true)
                    const approveBlock = window.web3.eth.getBlock("latest");
                    let depositBySplit = await financeAppcontractOf.methods.depositBySplit(value.stdAmount, value.recieverAdress).send({
                        from: acc,
                        // gasLimit: approveBlock.gasLimit,
                        // gasPrice: await window.web3.eth.getGasPrice(),
                    });
                    setloader(false)
                    setModalShow2(false)

                    setModalShow3(false)
                    setModalShow(false)
                    setModalShow1(false)
                    toast.success("successfully deposit")
                }
                catch (e) {
                    console.log("Error While calling depositBySplit ", e);
                    setloader(false)
                    setModalShow2(false)

                    setModalShow3(false)
                    setModalShow(false)
                    setModalShow1(false)

                }

            }
            if (value.amount && value.recieverAdress) {

                let userInfo = await financeAppcontractOf.methods.userInfo(value.recieverAdress).call();
                // console.log("recieverAdress",userInfo);
                if (userInfo.referrer == '0x0000000000000000000000000000000000000000') {
                    setloaderr(true)
                    const approveBlock = window.web3.eth.getBlock("latest");

                    let transferBySplit = await financeAppcontractOf.methods.transferBySplit(value.recieverAdress, web3.utils.toWei(value.amount)).send({
                        from: acc,
                        // gasLimit: approveBlock.gasLimit,
                        // gasPrice: await window.web3.eth.getGasPrice(),
                    });
                    setloaderr(false)
                    setModalShow2(false)
                    toast.success("successfully transfer")
                    setModalShow3(false)
                    setModalShow(false)
                    setModalShow1(false)
                }
                else {
                    toast.error('already register')
                }
            }
        }
        catch (e) {
            // toast.error(e.messasge)
            console.log(e.messasge);
            setloader(false)
            setloaderr(false)
            setModalShow2(false)

            setModalShow3(false)
            setModalShow(false)
            setModalShow1(false)
        }
    }



    return (
        <div className='stack_d_main'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card stack_inner_card">
                            <div className="row">
                                <div className="col-lg-6 mt-3">
                                    <div className="card stack_sub_cards">
                                        <img src={d2} alt="" className='stack_d_img' />
                                        <Button className='start_btn s_d_W' onClick={() => setModalShow3(true)}>
                                            Register
                                        </Button>
                                        <Register
                                            show={modalShow3}
                                            onHide={() => setModalShow3(false)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <div className="card stack_sub_cards">
                                        <img src={d} alt="" className='stack_d_img' />
                                        <Button className='start_btn s_d_W' onClick={() => setModalShow(true)}>
                                            Deposit
                                        </Button>
                                        <Deposite_m
                                            show={modalShow}
                                            confirmdeposit={depositAmount}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-6 mt-3">
                                    <div className="card stack_sub_cards">
                                        <img src={d3} alt="" className='stack_d_img' />
                                        <Button className='start_btn s_d_W' onClick={() => setModalShow1(true)}>
                                            withdraw
                                        </Button>
                                        <Withdraw_m
                                            show={modalShow1}
                                            onHide={() => setModalShow1(false)}
                                            loader={loader}
                                            withdrawAmount={withdrawAmount}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-3">
                                    <div className="card stack_sub_cards">
                                        <img src={d1} alt="" className='stack_d_img' />
                                        <Button className='start_btn s_d_W' onClick={() => setModalShow2(true)}>
                                            Split Account
                                        </Button>
                                        <Split_m
                                            show={modalShow2}
                                            loader={loader}
                                            loaderr={loaderr}
                                            splitAmount={splitAmount}
                                            onHide={() => setModalShow2(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Stack_d
