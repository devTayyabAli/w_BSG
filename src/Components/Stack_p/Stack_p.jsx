import React, { useEffect, useState } from "react";
import "./Stack_p.css";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { RiMessage3Fill } from "react-icons/ri";
import { financeAppContractAddress, financeAppContract_Abi } from "../../utilies/Contract";
import { loadWeb3 } from "../../apis/api";
import { toast } from "react-toastify";

function Stack_p({ acc }) {

  let [accadress, setaccadress] = useState('')
  let [totalUsers, setTotalUsers] = useState('')
  let [dailyLuckyPool, setLuckpool] = useState('')
  let [daily_4_Star, setDaily_4_Star] = useState('')
  let [daily_3_Star, setDaily_3_Star] = useState('')






  const getDetail = async () => {
    // console.log("res",inputValue)
    // setShowModal(false)
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      // toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      // toast.error("Wrong Newtwork please connect to Polygon MainNet ")
    } else {
      try {



        const web3 = window.web3;
        let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);
        let totaluser = await financeAppcontractOf.methods.totalUser().call();
        setTotalUsers(totaluser)

        let dailyLuckyPool = await financeAppcontractOf.methods.luckPool().call();
        // console.log("dailyLuckyPool",dailyLuckyPool);
        dailyLuckyPool = web3.utils.fromWei(dailyLuckyPool)
        setLuckpool(dailyLuckyPool)

        let daily_4_Star = await financeAppcontractOf.methods.starPool().call();
        daily_4_Star = web3.utils.fromWei(daily_4_Star)
        setDaily_4_Star(daily_4_Star)


        let daily_3_Star = await financeAppcontractOf.methods.topPool().call();
        daily_3_Star = web3.utils.fromWei(daily_3_Star)
        setDaily_3_Star(daily_3_Star)


      } catch (e) {
        toast.error(e);


      }

    }
  }
  useEffect(() => {
    getDetail()
  },[]);

  return (
    <div className="main_stack_p_bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card stacking_p_card">
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <FaUserAlt className="icon_color fs-3"></FaUserAlt>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2">Participants</h3>
                      <p className="mt-3 text-white text-start">{totalUsers}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <AiOutlineShoppingCart className="icon_color fs-3"></AiOutlineShoppingCart>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2">Daily Lucky Pool</h3>
                      <p className="mt-3 text-white text-start">$:{Number(dailyLuckyPool).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <BsStars className="icon_color fs-3"></BsStars>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2">Daily 4 Star Pool
                      </h3>
                      <p className="mt-3 text-white text-start">${Number(daily_4_Star).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card inner_stack_p">
                    <div className="mt-3">
                      {" "}
                      <RiMessage3Fill className="icon_color fs-3"></RiMessage3Fill>
                    </div>

                    <div className="mt-3">
                      <h3 className="stack_p_h3 mb-2">Daily Top 3 Pool</h3>
                      <p className="mt-3 text-white text-start">${Number(daily_3_Star).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stack_p;
