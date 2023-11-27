import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdArrowBackIos } from 'react-icons/md'
import "./register.css"
import m1 from "../Assets/m1.png"
import { financeAppContractAddress, financeAppContract_Abi, financeAppTokenAddress, financeAppTokenAbi } from '../../utilies/Contract';
import { loadWeb3 } from '../../apis/api';
import Web3 from 'web3'
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

function Register(props, getAccount) {

    let [accadress, setaccadress] = useState('')
    let [regisdterAdress, setRegisdterAdress] = useState()
    let [amount, setAmount] = useState('')
    const [RefID, setRefID] = useState("")
    let [loader, setloader] = useState(false)



    const register = async () => {
        // console.log('what is value')
        // console.log("res",inputValue)
        // setShowModal(false)
        let acc = await loadWeb3();
        // console.log("ACC=",acc)
        console.log('what ')
        if (acc == "No Wallet") {
            // toast.error("No Wallet Connected")
        }
        else if (acc == "Wrong Network") {
            // toast.error("Wrong Newtwork please connect to Polygon MainNet ")
        } else {

            if (getAccount) {
                setloader(true)
                try {
                    setaccadress(acc)


                    const web3 = window.web3;
                    let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
                    let financeAppTokenOf = new web3.eth.Contract(financeAppTokenAbi, financeAppTokenAddress);


                    let userInfo = await financeAppcontractOf.methods.userInfo(acc).call();

                    let userInfos = await financeAppcontractOf.methods.userInfo(regisdterAdress).call();

                    let totalDeposit = userInfos.totalDeposit

                    let defaultRefer = await financeAppcontractOf.methods.defaultRefer().call();
                    console.log("regisdterAdress", regisdterAdress);

                    try {
                        setloader(true)
                        if (totalDeposit > 0 || regisdterAdress.toLowerCase() == defaultRefer.toLowerCase()) {
                            if (userInfo.referrer == '0x0000000000000000000000000000000000000000') {

                                // if ((parseInt(amount) > 49 && parseInt(amount) <= 10000)) {
                                //     let maxDeposit = Web3.utils.fromWei(userInfo.maxDeposit)
                                //     if ((parseInt(maxDeposit) == 0 || parseInt(amount) >= parseInt(maxDeposit))) {
                                //         if (parseInt(amount) % 50 === 0) {
                                //             // amount=amount + Number(0.002)
                                //             console.log("Check", amount);   
                                //             amount = web3.utils.toWei(amount)

                                // const approveBlock = window.web3.eth.getBlock("latest");
                                // let approve = await financeAppTokenOf.methods.approve(financeAppContractAddress, (amount)).send({
                                //     from: acc,
                                //     gasLimit: approveBlock.gasLimit,
                                //     gasPrice: await window.web3.eth.getGasPrice(),

                                // });

                                let register = await financeAppcontractOf.methods.register(regisdterAdress).send({
                                    from: acc
                                    // gasLimit: approveBlock.gasLimit,
                                    // gasPrice: await window.web3.eth.getGasPrice(),

                                });
                                toast.success('Successfully Register')
                                props.onHide()

                                setloader(false)
                            }
                            //         else {
                            //             toast.error('please enter value in ratio 50 ')
                            //             setloader(false)

                            //         }
                            //     } else {
                            //         toast.error(`please enter value greater then ${maxDeposit}`)
                            //         setloader(false)

                            //     }
                            // }
                            // else {
                            //     toast.error('value must be greater then 50 and less then 10000 ')
                            //     setloader(false)

                            // }


                            else {
                                toast.error('referrer bonded')
                                setloader(false)
                                props.onHide()

                            }
                        }

                        else {
                            toast.error('invalid refer')
                            setloader(false)
                            props.onHide()

                        }
                    }
                    catch (e) {
                        console.log('what is error from blockchain', e.message)
                        setloader(false)
                        props.onHide()

                    }


                } catch (e) {
                    console.log(e);
                    setloader(false)
                    props.onHide()



                }
            } else {
                toast.error('plz connect 1st')
                setloader(false)

                props.onHide()

            }


        }
    }


    const ReferralAddress = async () => {

        try {

            let URL = window.location.href;


            if (URL.includes("referrallink")) {
                // setcheckreffarl(true)
                let pathArray = URL.split('?');

                let UserID = pathArray[pathArray.length - 1]
                UserID = UserID.split('=')
                UserID = UserID[UserID.length - 1]

                setRegisdterAdress(UserID)


            } else {
                const web3 = window.web3;

                let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);

                let defaultRefer = await financeAppcontractOf.methods.defaultRefer().call();
                setRegisdterAdress(defaultRefer)

            }



        } catch (e) {
            console.log("Erroe Whille Referral Fuction Call", e);
        }
    }

    useEffect(() => {

        ReferralAddress()
    }, []);



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
                                        <Button onClick={() => props.onHide()} style={{ backgroundColor: "#0a86c4", border: "1px solid #0a86c4" }}><MdArrowBackIos ></MdArrowBackIos></Button> </div>
                                    <h4 className='ms-5 modal_h4'>Register</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className='body_m_bg'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <input type="text" placeholder='Enter Address' value={regisdterAdress} onChange={(e) => { setRegisdterAdress(e.target.value) }} className='input_modal' />
                                {/* <input type="text" placeholder='Enter amount in WUSDT' value={amount} onChange={(e) => { setAmount(e.target.value) }} className='input_modal mt-3' /> */}

                            </div>

                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className='footer_m_bg'>
                    <Button className='s_d_Ws  w-100' onClick={() => { register() }}>{loader ? <ReactLoading type="spin" color="#ffffff" className='mb-2 mx-auto' height={30} width={30} /> : "Confirm Registration"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Register
