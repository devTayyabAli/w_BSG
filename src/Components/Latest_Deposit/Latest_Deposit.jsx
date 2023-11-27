import React, { useEffect, useState } from 'react'
import RepetationComponent from '../My_team/RepetationComponent'
import './Latest_Deposit.css'
import Stacking_top from '../Stacking_top/Stacking_top'
import { loadWeb3 } from '../../apis/api'
import { financeAppContractAddress, financeAppContract_Abi } from '../../utilies/Contract'
import { toast } from 'react-toastify'
import Moment from 'react-moment';
import m1 from "../Assets/m1.png"

// import Moment from 'react-moment';
import moment from 'moment';
import { ColorRing } from 'react-loader-spinner'
function Latest_Deposit() {

	const [orderInfos, setOrderInfo] = useState('')
	const [userinfo, setUserInfo] = useState('')
	const [orderamount, setOrderAmount] = useState('')
	const [amount, setAmount] = useState([])
	const [rewardInfo, setrewardInfo] = useState([])
	const [isloading, setisloading] = useState(false)



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
				let orderlength = await financeAppcontractOf.methods.getOrderLength(acc).call();
				// console.log('what is orderlength', orderlength)
				orderlength = parseInt(orderlength)

				let newArrayForState = []
				for (let i = 0; i < orderlength; i++) {

					let orderInfos = await financeAppcontractOf.methods.orderInfos(acc, i).call();
					let amounts = web3.utils.fromWei(orderInfos.amount)
					let index = amount.findIndex(item => item.index === i)
					if (index === -1) {
						let newArr = { index: i, value: amounts }
						newArrayForState.push(newArr)
					}
				}

				setAmount(newArrayForState)


			} catch (e) {
				console.log(e.message);


			}

		}
	}


	useEffect(() => {
		getDetail()
	}, []);




	const gertRewardAddress = async () => {
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
				let userInfo = await financeAppcontractOf.methods.userInfo(acc).call();
				let val = userInfo.teamNum
				let depositLength = await financeAppcontractOf.methods.getDepositorsLength().call();
				// console.log("depositLength", depositLength);
				let dd = {}

				setisloading(true)
				for (let i = 0; i < depositLength; i++) {

					let depositAddress = await financeAppcontractOf.methods.depositors(i).call()
					let next = await financeAppcontractOf.methods.getOrderLength(depositAddress).call()
					dd[depositAddress] = next;
				}
				// console.log("wIT FOR ME", dd, Object.keys(dd))
				let objectdata = []
				for (let index = 0; index < Object.keys(dd).length; index++) {
					const elementKey = Object.keys(dd)[index];
					const next = dd[elementKey]
					for (let j = next - 1; j >= 0; j--) {
						let userinfos = await financeAppcontractOf.methods.orderInfos(elementKey, j).call()

						let address_here = elementKey?.substring(0, 15) + "..." + elementKey?.substring(elementKey?.length - 15);
						let reward = web3.utils.fromWei(userinfos.amount)
						reward = parseFloat(reward).toFixed(3)
						let newArr = { address: address_here, userinfos1: moment((userinfos?.start * 1) * 1000).format('D MMM YYYY hh:mm:ss a'), userinfos: (userinfos?.start), amount: reward }
						objectdata.push(newArr)
					}
				}

				// for (let i = 0; i < depositLength; i++) {

				// 	let depositAddress = await financeAppcontractOf.methods.depositors(i).call()


				// 	let next = await financeAppcontractOf.methods.getOrderLength(depositAddress).call()

				// 	for (let j = next - 1; j >= 0; j--) {
				// 		let userinfos = await financeAppcontractOf.methods.orderInfos(depositAddress, j).call()

				// 		let address_here = depositAddress?.substring(0, 15) + "..." + depositAddress?.substring(depositAddress?.length - 15);
				// 		let reward = web3.utils.fromWei(userinfos.amount)
				// 		reward = parseFloat(reward).toFixed(3)
				// 		let newArr = { address: address_here, userinfos1: moment((userinfos?.start * 1) * 1000).format('D MMM YYYY hh:mm:ss a'), userinfos: (userinfos?.start), amount: reward }
				// 		objectdata.push(newArr)
				// 	}

				// }
				let objectdata1 = objectdata.sort(function (left, right) {
					return Number(left?.userinfos) < Number(right?.userinfos) ? 1 : -1
				});
				setrewardInfo(objectdata1)
				setisloading(false)


			} catch (e) {
				console.log(e.message);


			}

		}
	}
	useEffect(() => {
		gertRewardAddress()
	}, []);

	return (
		<div className='main_latest_deposite'>

			<h3 className='text-white pstartt mb-3'>Latest Deposit</h3>
			<RepetationComponent />
			<div className="main_deposit mt-5">
				<div className="second_deposit" style={{ height: "500px", overflowY: "auto" }}>
					<div className="fi_line">
						<p>Latest Depositors</p>
					</div>
					{isloading ? <div className="first_line"><ColorRing
						visible={true}
						height="80"
						width="80"
						ariaLabel="blocks-loading"
						wrapperStyle={{}}
						wrapperClass="blocks-wrapper"
						colors={['#0a86c4', '#0a86c4', '#0a86c4', '#0a86c4', '#0a86c4']}
					/>
					</div> : <>
						{

							rewardInfo && rewardInfo.slice(0, 10).map((item, index) => {
								return (
									<div className="first_line">
										<span className='spn '>{`${index + 1}).`}</span>
										<span className='inlarge'>{item.address}</span>
										<span className='inResponse' style={{ marginLeft: '1rem' }}>{item.address?.substring(0, 4) + "..." + item.address?.substring(item.address?.length - 4)}</span>


										<span><Moment format="D MMM YYYY hh:mm:ss a" unix >{`${item.userinfos}`}</Moment></span>

										<div className='group_img '><img src={m1} className='' alt="" width="15%" />&nbsp;&nbsp; &nbsp; {item.amount} &nbsp;WUSDT</div>
									</div>)

							})}</>}



					{/* <div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="first_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div>

					<div className="last_line">
						<span className='spn'>Nill</span>
						<span>...</span>
						<div className='group_img'>	<img src="Group.png" alt="" />WUSDT</div>
					</div> */}
				</div>
			</div>
		</div>
	)
}

export default Latest_Deposit