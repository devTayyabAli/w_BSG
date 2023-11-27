import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdArrowBackIos } from 'react-icons/md'
import "./Deposite_m.css"
import m1 from "../Assets/1200px-Dai_Logo (2).png"
import { financeAppContractAddress, financeAppContract_Abi } from '../../utilies/Contract';
import { loadWeb3 } from '../../apis/api';
import Web3 from 'web3'
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

function Deposite_m(props) {
    let [amount, setAmount] = useState()
    let [accadress, setaccadress] = useState('')
    let [userInfo, setuserInfo] = useState('')
    let [defaultreferAdress, setdefaultreferAdress] = useState('')
    let [loader, setloader] = useState(false)
    let [depositandintrest, setdepositandintrest] = useState()

    const confirmDeposit = async () => {
        if ((parseInt(amount) > 49 && parseInt(amount) <= 2000)) {
            let maxDeposit = Web3.utils.fromWei(userInfo.maxDeposit)
            if ((parseInt(maxDeposit) == 0 || parseInt(amount) >= parseInt(maxDeposit))) {
                if (parseInt(amount) % 50 === 0) {
                    if (userInfo.referrer == '0x0000000000000000000000000000000000000000') {
                        toast.error('please Register Account 1st ')
                    }
                    else {
                        setloader(true)
                        let value = await props.confirmdeposit(amount)
                        setloader(false)
                    }
                }
                else {
                    toast.error('please enter value in ratio 50 ')

                }
            } else {
                toast.error(`please enter value greater then ${maxDeposit}`)
            }
        }
        else {
            toast.error('value must be greater then 50 and less then 2000 ')
        }
    }
    const getUserDetail = async () => {
        let acc = await loadWeb3();
        console.log('what ')
        if (acc == "No Wallet") {
            // toast.error("No Wallet Connected")
        }
        else if (acc == "Wrong Network") {
            // toast.error("Wrong Newtwork please connect to Polygon MainNet ")
        } else {
            try {
                setaccadress(acc)
                const web3 = window.web3;
                let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
                let userMaximumAmount = await financeAppcontractOf.methods.userInfo(acc).call();
                setuserInfo(userMaximumAmount)
                let defaultreferAdress = await financeAppcontractOf.methods.defaultRefer().call();
                setdefaultreferAdress(defaultreferAdress)
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    useEffect(() => {
        getUserDetail()
    }, []);
    const deposit = async (e) => {
        setAmount(e.target.value)
        console.log('what is deposit value', typeof parseInt(e.target.value))
        let value = parseInt(e.target.value) / 100 * 20;
        value = parseInt(e.target.value) + value
        setdepositandintrest(value)
    }
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modal_bg'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 p-o">
                                <div className="d-flex">
                                    <div className="icons_m">
                                        <Button onClick={() => props.onHide()} style={{ backgroundColor: "#0a86c4", border: "1px solid #0a86c4" }}><MdArrowBackIos ></MdArrowBackIos></Button>
                                    </div>
                                    <h4 className='ms-5 modal_h4'>Deposit</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className='body_m_bg'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <input type="number" min="50" max="2000" value={amount} onChange={deposit} className='input_modal' placeholder='50' />
                                <p className='modal_pa'>Minimum deposit 50 WUSDT. A ratio of 50 max 2000</p>
                            </div>
                            <div className="col-lg-4">
                                <div className="d-flex gsa mt-2">
                                    <img src={m1} className='w-50' alt="" />
                                    {/* <div>
                                        <p className='input_sub_p asasaa'>WUSDT</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card modal_sub_card">
                                    <div className="row sasaasa ">
                                        <div className="col-lg-4 col-4">
                                            <p className='text-white mb-0'>{amount} WUSDT</p>
                                            <p className='sub_para'>Deposit</p>
                                        </div>
                                        <div className="col-lg-4 col-4">
                                            <p className='text-white mb-0'>20%</p>
                                            <p className='sub_para'>Each cycle</p>
                                        </div>
                                        <div className="col-lg-4 col-4">
                                            <p className='text-white mb-0 res_fs'>{depositandintrest} WUSDT</p>
                                            <p className='sub_para res_fs'>Deposit and interest</p>
                                        </div>

                                    </div>
                                    <p className='text-white'>10 days per cycle. 20% per cycle
                                        You will have to redeposit every time after each cycle. It will have to be either the same amount or bigger amount. Every 2 cycle you deposit 1 extra days will be added without extra rewards. Maximum 50 days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='footer_m_bg'>
                    <Button className='s_d_Ws  w-100' onClick={() => { confirmDeposit() }}>{loader ? <ReactLoading type="spin" color="#ffffff" className='mb-2 mx-auto' height={30} width={30} /> : "Confirm"} </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Deposite_m
