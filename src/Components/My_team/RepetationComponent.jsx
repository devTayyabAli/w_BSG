import React, { useEffect, useState } from 'react'
import { loadWeb3 } from '../../apis/api';
import { financeAppContractAddress, financeAppContract_Abi } from '../../utilies/Contract';
import './My_team.css'
import Moment from 'react-moment';
import moment from 'moment';
import { MdLocationOn } from 'react-icons/md';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { GiCycle } from 'react-icons/gi';
import { toast } from 'react-toastify';
const RepetationComponent = () => {
    const [depositTime, setdepositTime] = useState('')
    const [unixTime, setUnixTime] = useState('')
    const [unixTime2, setUnixTime2] = useState('')
    const [unixFreezTime, setUnixFreezTime] = useState('')
    const [days, setDays_here] = useState(0)

    const [hours, setHours_here] = useState(0)

    const [minutes, setMunits_here] = useState(0)

    const [seconds, setSeconds] = useState(0)
    const getDetail = async () => {
        let acc = await loadWeb3();

        try {
            const web3 = window.web3;
            let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
            let depostTime = await financeAppcontractOf.methods.getCurDay().call();
            setdepositTime(depostTime)
            let startTime = await financeAppcontractOf.methods.startTime().call();
            setUnixTime(startTime)
           

        }
        catch (e) {
            // toast.error(e.message);
            console.log(e.message);
        }

    }


    const getDeposit_time = async () => {
        let acc = await loadWeb3();

        try {

            const web3 = window.web3;
            let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);

          

            let getOrderLength = await financeAppcontractOf.methods.getOrderLength(acc).call();
            if (getOrderLength > 0) {
                getOrderLength = getOrderLength - 1

                let orderInfos = await financeAppcontractOf.methods.orderInfos(acc, getOrderLength).call();

                // let FinalTime= Number(orderInfos.unfreeze) - Number(orderInfos.start) 
                let FinalTime = Number(orderInfos.unfreeze)


                var currentDateTime = new Date();
                let resultInSeconds = currentDateTime.getTime() / 1000;

                // console.log("Time_here",parseInt(FinalTime) );
                let Time_here = (FinalTime) - parseInt(resultInSeconds)
                let TimeFinal = parseInt(Time_here)
                if (TimeFinal > 0) {
                    let days = parseInt(TimeFinal / 86400)

                    setDays_here(days)
                    TimeFinal = TimeFinal % (86400)
                    let hours = parseInt(TimeFinal / 3600)
                    setHours_here(hours)
                    TimeFinal %= 3600
                    let munites = parseInt(TimeFinal / 60)
                    setMunits_here(munites)
                    TimeFinal %= 60
                    let second_here = parseInt(TimeFinal)

                    setSeconds(second_here)

                    // user = 'yes'


                }
                else {
                    setDays_here(0)
                    setHours_here(0)
                    setMunits_here(0)
                    setSeconds(0)
                    // setIsDisable(false)

                }

                setUnixTime2(orderInfos.start)
                setUnixFreezTime(orderInfos.unfreeze)

            }
            else {
                // toast.error('please deposit 1st')

            }

        } catch (e) {
            console.log("Error While Get Time", e);
        }
    }



    useEffect(() => {
        getDetail()

     let id= setInterval(() => {
            getDeposit_time()
        }, 1000);
        return () => {
            clearInterval(id)
        }


    }, []);

    return <div>
        <div className="main_first">
            <div className="main_scnd">
                <div className="main_third">
                    <MdLocationOn className='icon_color fs-3'></MdLocationOn>
                    <p className='contract1'>Contract Address: <a href={`https://testnet.bscscan.com/address/${financeAppContractAddress}`} className="stack_p2" target="_blank">{financeAppContractAddress} </a></p>
                    <p className='contract2'>Contract Address: <a href={`https://testnet.bscscan.com/address/${financeAppContractAddress}`} className="stack_p2" target="_blank" >{(financeAppContractAddress?.substring(0, 4) + "..." + financeAppContractAddress?.substring(financeAppContractAddress?.length - 4))}</a></p>

                    
                </div>
                <div className="main_third">
                    <BsFillStopwatchFill className='icon_color fs-3'></BsFillStopwatchFill>
                    {/* <p>Platform Running time: <Moment format="D MMM YYYY HH:MM:SS" unix >{unixTime}</Moment></p> */}
                    <p>Platform Running Time: {depositTime} days</p>

                </div>
                <div className="main_third">
                    <GiCycle className='icon_color fs-3'></GiCycle>
                    <p>Income: 10 days per cycle. Monthly 60%</p>
                </div>
                <div className="main_third">
                    <BsFillStopwatchFill className='icon_color fs-3'></BsFillStopwatchFill>
                    <p>Deposit Time: {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds</p>
                </div>
            </div>
        </div>
    </div>
};

export default RepetationComponent;
