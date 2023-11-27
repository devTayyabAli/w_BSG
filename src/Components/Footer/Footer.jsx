import React from "react";
import "./Footer.css";
import LOGO1 from "../Assets/LOGO2.png"

import { BsTwitter } from "react-icons/bs";
import { BsTelegram } from "react-icons/bs";
import { FiBluetooth } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import ftI04 from '../../Assets/ftI04.png';
import ftI01 from '../../Assets/ftI01.png';
import wyscan from '../../Assets/wyscan.png';

function Footer() {
  return (
    // <div className="footer_main_bg">
    //   <div className="inner_footer">
    //     <div className="container">
    //       <div className="footer_img">
    //         <a href="#" className="footer_img_ml">
    //           <img src={LOGO1} className='www' alt="" />
    //         </a>
    //       </div>
    //       <div className="social">
    //         <a href="" className="footer_icons ml">
    //           {" "}
    //           <BsTwitter></BsTwitter>
    //         </a>
    //         <a href="" className="footer_icons ml">
    //           {" "}
    //           <FaDiscord></FaDiscord>{" "}
    //         </a>
    //         <a href="" className="footer_icons ml">
    //           {" "}
    //           <FaTwitch></FaTwitch>{" "}
    //         </a>
    //         <a href="" className="footer_icons ml">
    //           {" "}
    //           <AiFillInstagram></AiFillInstagram>
    //         </a>
    //         <a href="" className="footer_icons ml">
    //           {" "}
    //           <AiFillLinkedin></AiFillLinkedin>
    //         </a>
    //         <a href="" className="footer_icons ml ">
    //           {" "}
    //           <FaFacebookF></FaFacebookF>{" "}
    //         </a>{" "}
    //       </div>
    //     </div>
    //   </div>


    //   <div className="container footer_copy">
    //     <div className="row justify-content-center py-4">
    //       <p className=" footer_text">DECENTRALIZED FINANCE SYSTEM © 2022 | All Rights Reserved</p>
    //     </div>
    //   </div>
    // </div>
<>
<footer className="foot">
    <div className="container">
	<div className="ftK Indwark flexC fl-bet">
		<div className="ftKn">
			<div className="ftKnL flexC">
				
			</div>	
		</div>
		<div className="ftKI flexC">
			<a href="https://wyzthscan.org/" className="ftKIa"><BsTelegram /></a>
			<a href="https://wyzthscan.org/" className="ftKIa"><FiBluetooth /></a>
			<a href="https://twitter.com/BSGSplitGame" className="ftKIa"><BsTwitter /></a>
		</div>
	</div>
    </div>
</footer>
</>

  );
}

export default Footer;
