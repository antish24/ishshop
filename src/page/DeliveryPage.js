import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';
import styles from './deliverypage.module.css'
import { useNavigate } from 'react-router-dom'
import supabase from '../store/Supabase';
import { BsUpload } from 'react-icons/bs';
import { Auth } from '../store/Context';
import Log from '../components/Log';
import {useDispatch } from 'react-redux';
import {decrementCart } from "../store/cartSlice";

const DeliveryPage = () => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const naviagte=useNavigate()
  const [selectedLocation, setSelectedLocation] = useState(null);
  const[error,seterror]=useState('')
  const [tprice,settprice]=useState()
  const [buying,setbuying]=useState(false)
  const phoneRef=useRef()
  const{currentUser}=Auth()

  async function buy(){
    if(phoneRef.current.value && selectedLocation!==null){
        const num=phoneRef.current.value
        if(num > 900000000)
       { 
        if(currentUser){
          setbuying(true)

          for(let x=0 ; x < cartItems.length ; x++){
          const {err}= await supabase
          .from('boughtproduct')
          .insert({location:selectedLocation,phone:phoneRef.current.value,pid:cartItems[x].id,user:currentUser.uid,status:'pending'})
          if(err){
            seterror(err.message)
          }
          else {
            phoneRef.current.value=null
            setSelectedLocation(null)
            seterror('done')
            for(let y=0 ;y<cartItems.length ;y++){
              dispatch(decrementCart(cartItems[y].name))
            }
          }
        }
   
        }
        else{
          seterror('Log in first')
        }
    }
    else {
        seterror('Enter valid Phone number first')
    }
    }
    else seterror('Provide input first')
    setbuying(false)
  }

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value)
  };
  
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
  return (
    <>
    {currentUser ?<>{
     cartItems.length >0 ?
      <div className={styles.cont}>
        <div className={styles.box}>
        <div className={styles.address}>
            <h1>Add Delivery Address</h1>
            <form>
                <select onChange={handleLocationChange}>
                    <option value='' hidden>Location</option>
                    <option value='Addis Abeba'>Addis Abeba</option>
                    <option value='Bahir dar'>Bahir dar</option>
                    <option value='Hawassa'>Hawassa</option>
                    <option value='Gonder'>Gonder</option>
                </select>
                <div className={styles.phonenumber}><div className={styles.numformat}>+251</div><input ref={phoneRef} maxLength={9} placeholder='911755025'/></div>
            </form>
            {error}
            <button onClick={buy} disabled={buying}>{buying ?
              <>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </>
            : 'Buy'}</button>
        </div>

        <div className={styles.cartsummary}>
            <h1>Cart Summary</h1>
            <div className={styles.lists}>
                {cartItems.map((list)=>{
                    return(
                        <div className={styles.maplist}>
                            <span>{list.name}</span>
                    <div className={styles.cartprice}>{list.price} <div>Birr</div></div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.summaryfooter}>
                <strong>Total</strong>
                <div className={styles.totalprice}>{tprice}<div>Birr</div></div>
            </div>
        </div>
    </div>
    </div>
  :
naviagte('/shop')
  }</>
    :
    <Log/>}
    </>
  )
}

export default DeliveryPage