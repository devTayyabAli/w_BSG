import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdArrowBackIos } from 'react-icons/md'
import "./Split_m.css"
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { financeAppContractAddress, financeAppContract_Abi } from '../../utilies/Contract';
import { loadWeb3 } from '../../apis/api';

function Split_m(props) {
  let [amount, setAmount] = useState('')
  let [stdAmount, setsdtAmount] = useState('')
  let [recieverAdress, setRecieverAdress] = useState('')
  const [getsplit_Value, setgetsplit_Value] = useState("")
  const [depositcheck, setdepositcheck] = useState(1)
  // const [transfor, settransfor] = useState(false)


  const changeValue = async (e) => {
    setsdtAmount(e.target.value);
  }
  const changeValueAmount = async (e) => {
    setAmount(e.target.value)
  }
  const changeRecieverAdress = async (e) => {
    setRecieverAdress(e.target.value)
  }
  const confirmDeposit = async () => {
    if (Number(amount) > 49 && Number(amount) % 10 === 0) {
      props.splitAmount({ stdAmount: amount, recieverAdress: recieverAdress })
    }
    else {
      toast.error('value must be 50 or  greater then 50 ')
    }
  }
  const getsplit = async () => {
    let acc = await loadWeb3();

    if (acc == "No Wallet") {
      // toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      // toast.error("Wrong Newtwork please connect to Polygon Mainnet  ")
    } else {
      try {
        const web3 = window.web3;
        let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
        let getCurSplit = await financeAppcontractOf.methods.rewardInfo(acc).call();
        // console.log('getCurSplit', getCurSplit)
        getCurSplit = web3.utils.fromWei(getCurSplit.split)

        getCurSplit = parseFloat(getCurSplit).toFixed(2)
        setgetsplit_Value(getCurSplit)
      }
      catch (e) {
        toast.error(e.message);
      }
    }
  }

  useEffect(() => {
    getsplit()
  }, [])

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='modal_bg' >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 p-o">
                <div className="d-flex">
                  <div className="icons_m">
                    <Button onClick={() => (props.onHide(), setdepositcheck(1))} style={{ backgroundColor: "#0a86c4", border: "1px solid #0a86c4" }}><MdArrowBackIos></MdArrowBackIos></Button>
                  </div>
                  <h4 className='ms-5 modal_h4'>Split Account</h4>
                </div>
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className='body_m_bg'>


          {
            depositcheck == 2 ?

              <>
                {/* <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className='mb-0 text-white pb-2'>WUSDT</p>
                      <input type="text" value={stdAmount}
                        disabled={amount.toString().length > 0 || recieverAdress.toString().length > 0}
                        onChange={changeValue} className='w-100 input_modal'
                        placeholder='0' readonly />
                    </div>
                  </div>
                </div> */}
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-lg-8">
                      <p className='text-white p-0 m-0 pb-1'>Amount</p>
                      <input type="text"
                        disabled={stdAmount.toString().length > 0}
                        value={amount}
                        onChange={changeValueAmount} className='input_modal' placeholder='50' />
                      <p className='modal_pa'>The ratio of 50</p>
                    </div>
                    <div className="col-lg-4">
                      <div className="d-flex gsaa">
                        <div>
                          <p className='input_sub_p asasaa ' style={{ color: "#0a86c4" }} >{getsplit_Value} WUSDT</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className='mb-0 text-white pb-2'>Receiver address</p>
                      <input type="text" value={recieverAdress} onChange={changeRecieverAdress} className='w-100 input_modal' placeholder='0' />
                    </div>
                  </div>
                </div>
                <Button className='s_d_Ws  w-100' onClick={() => { confirmDeposit() }}> {props.loader ? <ReactLoading type="spin" color="#ffffff" className='mb-2 mx-auto' height={30} width={30} /> : "Deposit"}</Button>

              </>
              : depositcheck == 3 ?
                <>
                  {/* <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <p className='mb-0 text-white pb-2'>WUSDT</p>
                      <input type="text" value={stdAmount}
                        disabled={amount.toString().length > 0 || recieverAdress.toString().length > 0}
                        onChange={changeValue} className='w-100 input_modal'
                        placeholder='0' readonly />
                    </div>
                  </div>
                </div> */}
                  <div className="container mt-3">
                    <div className="row">
                      <div className="col-lg-8">
                        <p className='text-white p-0 m-0 pb-1'>Amount</p>
                        <input type="text"
                          disabled={stdAmount.toString().length > 0}
                          value={amount}
                          onChange={changeValueAmount} className='input_modal' placeholder='10' />
                        <p className='modal_pa'>The ratio of 10</p>
                      </div>
                      <div className="col-lg-4">
                        <div className="d-flex gsaa">
                          <div>
                            <p className='input_sub_p asasaa ' >{getsplit_Value} WUSDT</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <p className='mb-0 text-white pb-2'>Receiver address</p>
                        <input type="text" value={recieverAdress} onChange={changeRecieverAdress} className='w-100 input_modal' placeholder='0' />
                      </div>
                    </div>
                  </div>
                  <Button className='s_d_Ws  w-100' onClick={() => { props.splitAmount({ amount: amount, recieverAdress: recieverAdress }) }}>{props.loaderr ? <ReactLoading type="spin" color="#ffffff" className='mb-2 mx-auto' height={30} width={30} /> : "Transfer"}</Button>


                </>
                :
                <>
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-6">
                        <Button className='s_d_Ws  w-100' onClick={() => { setdepositcheck(2) }}> {props.loader ? <ReactLoading type="spin" color="#ffffff" className='mb-2 mx-auto' height={30} width={30} /> : "Deposit"}</Button>
                      </div>
                      <div className="col-lg-6">
                        <Button className='s_d_Ws  w-100' onClick={() => setdepositcheck(3)}>{props.loaderr ? <ReactLoading type="spin" color="#ffffff" className='mb-2 mx-auto' height={30} width={30} /> : "Transfer"}</Button>
                      </div>
                    </div>
                  </div>
                </>
          }




        </Modal.Body>
        <Modal.Footer className='footer_m_bg'>

        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Split_m
