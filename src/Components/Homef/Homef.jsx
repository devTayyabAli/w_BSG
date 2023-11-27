import React from 'react'
import "./Homef.css"
import hf from "../Assets/hf.png";
import Indchi01 from '../../Assets/Indchi01.png';
import Indchi02 from '../../Assets/Indchi02.png';
import Indchi03 from '../../Assets/Indchi03.png';
import Indzhu01 from '../../Assets/Indzhu01.png';
import Indzhu02 from '../../Assets/Indzhu02.png';
import Indzhu03 from '../../Assets/Indzhu03.png';
import Indxin05 from '../../Assets/Indxin05.png';
import Indxin01 from '../../Assets/Indxin01.png';
import Indxin02 from '../../Assets/Indxin02.png';
import Indxin03 from '../../Assets/Indxin03.png';
import Indjfz01 from '../../Assets/Indjfz01.png';
import Indjfz02 from '../../Assets/Indjfz02.png';
import Indjfz03 from '../../Assets/Indjfz03.png';
import { Link } from 'react-router-dom';




function Homef() {
  return (
    <div className='homef_main'>
       <div className="IndBan d-flex fl-bet">
            <div className="container">
	<div className="IndBanB Indwark Huans">
		<h3>
			A1 BOOSTER
		</h3>
		<p>
			Wrapped WYchain Blockchain Split Game
		</p>
		<div className="contribute">
       <Link to="/Dashboard/Home"> <a className="IndZhua">
			CONTRIBUTE
		</a>
		</Link>
        </div>
	</div>
    </div>
</div>
{/* <!-- className="IndZhua" --> */}
<div className="Indchi">
    <div className="container">
	<div className="IndchiH Indwark Huans flex fl-bet">
		<a href="" className="IndchiHa">
			<div className="IndchiHI"><img src={Indchi01}/></div>
			<h3>
				Daily Lucky Pool
			</h3>
			<p className="luckPool">$0.00</p>
		</a>
		<a href="" className="IndchiHa">
			<div className="IndchiHI"><img src={Indchi02}/></div>
			<h3>
				Daily Dimond pool
			</h3>
			<p className="starPool">$0.00</p>
		</a>
		<a href="" className="IndchiHa">
			<div className="IndchiHI"><img src={Indchi03}/></div>
			<h3>
				Daily Referral pool
			</h3>
			<p className="topPool">$0.00</p>
		</a>
	</div>
	<div className="IndchiK Indwark Huans flexC fl-bet">
		<div className="IndchiKL">
			<h3>
				Monthy 60% 
			</h3>
			<div className="contribute">
            <Link to="/Dashboard/Home"><a href="" className="IndZhua">
				CONTRIBUTE
			</a>
			</Link>
            </div>
		</div>
		<div className="IndchiKR">
			<a href="" className="IndchiKRa flexC">
				<p className="latestDeposit">...</p>
				<span className="latestAmount">$0.00</span>
			</a>
			<a href="" className="IndchiKRa flexC">
				<p className="latestDeposit">...</p>
				<span className="latestAmount">$0.00</span>
			</a>
			<a href="" className="IndchiKRa flexC">
				<p className="latestDeposit">...</p>
				<span className="latestAmount">$0.00</span>
			</a>
			<a href="" className="IndchiKRa flexC">
				<p className="latestDeposit">...</p>
				<span className="latestAmount">$0.00</span>
			</a>
		</div>
	</div>	
    </div>
</div>

<div className="Indzhu">
    <div className="container">
	<div className="IndzhuN Indwark Huans">
		<div className="IndzhuS">
			<div className="IndzhuI"><img src={Indzhu01}/></div>
			<h3>
				With No Energy and Minimum Gas Fee
			</h3>
		</div>
		<div className="IndzhuS">
			<div className="IndzhuI"><img src={Indzhu01}/></div>
			<h3>
				100% decentralise with professional audit 
			</h3>
		</div>
		<div className="IndzhuS">
			<div className="IndzhuI"><img src={Indzhu02}/></div>
			<h3>
				High return
			</h3>
			<p>
				10 days per cycle initialys at
				<span> 2%, </span>
				per cycle
				<span> 20%</span>
			</p>
		</div>
		<div className="IndzhuS">
			<div className="IndzhuI"><img src={Indxin05}/></div>
			<h3>
				Booster
			</h3>
			<p>In a month 1 direct each $1000 you will get boost your ROI 60%</p>
		</div>
		<div className="IndzhuS">
			<div className="IndzhuI"><img src={Indzhu03}/></div>
			<h3>
				Sustainability and longevity is the key for A1 BOOSTER
			</h3>
		</div>
		<div className="IndzhuS">
			<div className="IndzhuI"><img src={Indzhu03}/></div>
			<h3>
				Your package with insured by wyzth coin
			</h3>
		</div>
	</div>	
    </div>
</div>

<div className="Indxin">
    <div className="container">
	<div className="IndxinT">
		<h3>
			The most trusted platform. 
		</h3>
		<p>
			A1 BOOSTER the platform for financial freedom 
		</p>
	</div>
	<div className="IndxinK Indwark Huans flex fl-bet">
		<a href="" className="IndxinA">
			<div className="IndxinI"><img src={Indxin01}/></div>
			<h3>
				Fully Decentralised 
			</h3>
			<p>
				100% Decentralised 
				<br/>
				Smart contract coding fully verified by WYzthscan.
			</p>
		</a>
		<a href="" className="IndxinA">
			<div className="IndxinI"><img src={Indxin02}/></div>
			<h3>
				High return
			</h3>
			<p>
				60% monthly return
				<br/>
				And it's not a high risk platform.
			</p>
		</a>
		<a href="" className="IndxinA">
			<div className="IndxinI"><img src={Indxin03}/></div>
			<h3>
				1-1 matching orders
			</h3>
			<p>
				Sustainable formula
			</p>
		</a>
	</div>	
    </div>
</div>

<div className="Indjfz">
    <div className="container">
	<div className="IndjfzT">
		Start within a few minutes
	</div>
	<div className="IndjfzN Indwark Huans flex fl-bet">
		<div className="Indjfzs">
			<img src={Indjfz01}/>
			<p>
				Create account
			</p>
		</div>
		<div className="Indjfzs">
			<img src={Indjfz02}/>
			<p>
				Connect wallet
			</p>
		</div>
		<div className="Indjfzs">
			<img src={Indjfz03}/>
			<p>
				CONTRIBUTE
			</p>
		</div>
		<div className="Indjfzx Indjfzx1"></div>
		<div className="Indjfzx Indjfzx2"></div>
	</div>	
    </div>
</div>

<div className="IndZhu flex fl-bet">
    <div className="container">
	<div className="IndZhuK Indwark Huans">
		<h3>
			Monthly 60% 
		</h3>
		<a href="#" className="IndZhua">
			Start earning
		</a>
	</div>	
    </div>
</div>


    </div>
  )
}

export default Homef
