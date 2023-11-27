import React, { useEffect, useState } from 'react'
import { loadWeb3 } from '../../apis/api';
import { financeAppContractAddress, financeAppContract_Abi } from '../../utilies/Contract';
import RepetationComponent from '../My_team/RepetationComponent';
import './Deposit_details.css';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
function Deposit_details() {
  const [orderInfos, setOrderInfo] = useState('')
  const [orderamount, setOrderAmount] = useState('')
  const [reward, setReward] = useState('')
  const [unixTime, setUnixTime] = useState('')
  const [unixFreezTime, setUnixFreezTime] = useState('')
  const [flag, setFlag] = useState(false)

  const getDetail = async () => {

    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      // toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      // toast.error("Wrong Newtwork please connect to Polygon MainNet ")
    } else {
      try {
        const web3 = window.web3;
        let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
        let getOrderLength = await financeAppcontractOf.methods.getOrderLength(acc).call();


        if (getOrderLength > 0) {
          getOrderLength = getOrderLength - 1

          let orderInfos = await financeAppcontractOf.methods.orderInfos(acc, getOrderLength).call();


          setUnixTime(orderInfos.start)
          setUnixFreezTime(orderInfos.unfreeze)
          // console.log("orderInfos",orderInfos.start);
          setOrderInfo({ ...orderInfos })
          let amount = web3.utils.fromWei(orderInfos.amount)
          let value = parseInt(amount) / 100 * 20;
          setReward(value)
          setOrderAmount(amount)
          setFlag(true)

        }
        else {
          // toast.error('please deposit 1st')

        }



      } catch (e) {
        // console.log('what is response', e)
        // toast.error(e.message);
      }

    }
  }
  useEffect(() => {
    getDetail()


  },[]);


  return (
    <div className='dddd'>
      <h3 className='text-white pstartt pt-5 pb-3'>Deposit Details</h3>
      <RepetationComponent />
      <div className="deposit_main">
        <div className="colm inner_div">
          <div className="deposit_second">
            <p>Deposit details</p>
          </div>
          <div className="deposi_second">
            <div>
              <span>Amount</span>
              {flag &&
                <p>{orderamount}</p>

              }

            </div>
            <div>
              <span>Deposit Date</span>
              {flag &&
                <p><Moment format="DD/MM/YYYY hh:mm:ss" unix >{unixTime}</Moment></p>
              }
            </div>
            <div>
              <span>Unlock Time</span>
              {flag &&
                <p><Moment format="DD/MM/YYYY hh:mm:ss" unix >{unixFreezTime}</Moment></p>
              }
            </div>
            <div>
              <span>Reward</span>
              {flag &&
                <p>{reward}</p>
              }
            </div>
            <div>
              <span>Order Status</span>
              {flag &&
                <p>{orderInfos.isUnfreezed ? 'Unfreeze' : 'Freeze'}</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Deposit_details