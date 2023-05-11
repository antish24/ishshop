import React, { useEffect, useState } from 'react'
import styles from './cart.module.css'
import Zcart from '../components/Zcart'
import { useSelector} from "react-redux";
import { selectCartItems } from "../store/cartSlice";
import { useNavigate } from 'react-router-dom';
import { FaImage, FaMinus, FaMoneyBill } from 'react-icons/fa';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const [tprice,settprice]=useState(null)
  const navigate=useNavigate()
  const totalprice=()=>{
    let price=0
    for(let x=0 ; x < cartItems.length ; x++){
      price =price + cartItems[x].price
    }
    settprice(price)
  }
  useEffect(()=>{
    totalprice()
  },[cartItems])

  function nav(){
    navigate('/deliverypage')
  }
  return (
    <div className={styles.box}>
        <div className={styles.cartheader}>
            <div className={styles.image}><FaImage size={20}/></div>
            <div className={styles.product}>PRODUCT</div>
            <div className={styles.price}><FaMoneyBill size={20}/></div>
            <div className={styles.quantity}>QUANTITY</div>
            <div className={styles.subtotal}>SUBTOTAL</div>
            <div className={styles.remove}><FaMinus/></div>
        </div>
      {cartItems.map((item) => (
        <Zcart {...item}
        />
      ))}

        <div className={styles.cartfooter} style={{display:tprice > 0 ?'flex':'none'}}>
          <div className={styles.total}>Total</div>
          <div className={styles.totalprice}>{tprice}</div>
          <button className={styles.payment} onClick={nav}>Next</button>
        </div>
        <div className={styles.emptycart} style={{display:tprice > 0 ?'none':'flex'}}>
          NONE
        </div>
    </div>
  )
}

export default Cart