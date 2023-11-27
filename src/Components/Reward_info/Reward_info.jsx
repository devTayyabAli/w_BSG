import React, { useEffect, useState } from 'react'
import { BsArrowUpRight } from 'react-icons/bs';
import { BsArrowDownRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { loadWeb3 } from '../../apis/api';
import { financeAppContractAddress, financeAppContract_Abi } from '../../utilies/Contract';
import RepetationComponent from '../My_team/RepetationComponent';
import './Reward_info.css'

function Reward_info() {

	const [rewardInfo, setrewardInfo] = useState([])
	const [dayTopUsers, setDayTopUsers] = useState([])
	const getDetail = async () => {
		let acc = await loadWeb3();
		if (acc == "No Wallet") {
			// toast.error("No Wallet Connected")
		}
		else if (acc == "Wrong Network") {
			// toast.error("Wrong Newtwork please connect to Polygon Mainnet ")
		} else {
			try {
				const web3 = window.web3;
				let financeAppcontractOf = new web3.eth.Contract(financeAppContract_Abi, financeAppContractAddress);

				let getCurDays = await financeAppcontractOf.methods.getCurDay().call();
				let getDayLuckLength = await financeAppcontractOf.methods.getDayLuckLength(getCurDays).call();

				let arr = []
				for (let i = 0; i < getDayLuckLength; i++) {
					var obj = {};
					let dayLuckUser = await financeAppcontractOf.methods.dayLuckUsers(getCurDays, i).call();
					let dayLuckDeposit = await financeAppcontractOf.methods.dayLuckUsersDeposit(getCurDays, i).call();
					dayLuckDeposit = web3.utils.fromWei(dayLuckDeposit)
					obj['adress'] = dayLuckUser;
					obj['value'] = dayLuckDeposit;
					arr.push(obj)
				}
				setrewardInfo(arr)
				let daytopsueradress = []
				for (let i = 0; i < getDayLuckLength; i++) {
					let dayTopUsersAdress = await financeAppcontractOf.methods.dayTopUsers(getCurDays, i).call();
					daytopsueradress.push(dayTopUsersAdress)
				}
				setDayTopUsers(daytopsueradress)

			} catch (e) {
				toast.error(e.message);
			}
		}
	}
	useEffect(() => {
		getDetail()

	}, []);

	return (
		<div className='reward_info_main'>
			<h3 className='text-white pstartt  mb-3'>Reward Infos</h3>
			<RepetationComponent />
			<div className="main_deposit">
				<div className="second_deposit">
					<div className="fi_line">
						<p>Lucky Player</p>
					</div>
					{
						rewardInfo?.map((item, index) => {
							return (
								<div className="first_line" key={index}>
									<div className="nill">{index + 1} <span className='ms-2 me-2'>|</span><span className='spn'> {item.adress}</span></div>

									<div className='group_img'>	<img src="Group.png" alt="" /> {item.value} WUSDT</div>
								</div>
							)
						})
					}
				</div>
			</div>
			<div className="main_deposit mb-3">
				<div className="second_deposit">
					<div className="fi_line">
						<p>Top 3 Players</p>
					</div>
					{dayTopUsers.map((item, index) => {
						return (
							<div className="pehli_line" key={index}>
								<div className="nill">{index + 1} <span className='ms-2 me-2'>|</span><span className='spn'> {item}</span></div>
								<div className='group_img'><BsArrowUpRight></BsArrowUpRight></div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
export default Reward_info