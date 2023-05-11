import React, { useRef } from "react";
import { FaFacebook, FaInstagram, FaMailBulk, FaShoppingBag, FaShoppingCart, FaTelegram, FaTiktok } from "react-icons/fa";
import { MdOnlinePrediction, MdSend } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styles from "./home.module.css";
import landingpic from '../img/1.png'
const Home = () => {
  const msgRef=useRef()
  function sendmsg(){
    msgRef.current.value=null
  }
  return (
    <div className={styles.cont}>
      <div className={styles.box}>
       <div className={styles.body}>
        <div className={styles.seller}>
          <div className={styles.co}></div>
          <div className={styles.ct}></div>
          <div className={styles.ctt}></div>
          <div className={styles.cf}></div>
        <p>Our website is designed to make it easy for you to navigate through the different product categories  buy , sell and shop with ease.</p>
       </div>
        <div className={styles.buyer}>
          <img src={landingpic} alt='landing pic'/>
        </div>
       </div>
       <div className={styles.footer}>
          <div className={styles.contactform}>
            <div className={styles.ctop}><FaMailBulk size={40}/></div>
            <div className={styles.input}>
            <input placeholder="Your Message" ref={msgRef}/>
            <span onClick={sendmsg}><MdSend/></span>
            </div>
            <div className={styles.sociallinks}>
              Follow us 
              <span><FaTelegram/></span>
              <span><FaFacebook/></span>
              <span><FaTiktok/></span>
              <span><FaInstagram/></span>
            </div>
          </div>
          <div className={styles.content}>
            <div><FaShoppingBag size={26}/><span>Sell Your Products</span></div>
            <div><FaShoppingCart size={26}/><span>Buy Products</span></div>
            <div><MdOnlinePrediction size={26}/><span>Online with Ease</span></div>
          </div>
          <div className={styles.links}>
            <div><span>QUICK LINKS</span>
            <NavLink to='/sell'>Sell</NavLink>
            <NavLink to='/shop'>Shop</NavLink>
            <NavLink to='/catagory'>FOOD</NavLink>
            <NavLink to='/catagory'>Clothing</NavLink>
            <NavLink to='/catagory'>Shoes</NavLink></div>
            <div>
            <span>MY ACCOUNT</span>
            <NavLink to='/cart'>View Cart</NavLink>
            <NavLink to='/sell'>Create Account</NavLink>
            <NavLink to='/sell'>Login</NavLink>
            </div>
          </div>
       </div>
      </div>
    </div>
  );
};

export default Home;
