import styles from "./card.module.css";
import React, { useEffect, useState } from "react";
import { BsCart, BsFillCartCheckFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { incrementCart, decrementCart } from "../store/cartSlice";
import supabase from "../store/Supabase";
// import { incrementCart,decrementCart, selectCartItems } from "../store/cartSlice";
const Card = (item) => {
  const [show, setshow] = useState(true);
  const [img, setimg] = useState();
  const dispatch = useDispatch();
  // const cartItems = useSelector(selectCartItems);

  function addtocart() {
    dispatch(incrementCart(item));
    setshow(false);
  }
  
  useEffect(() => {
    if (item.photo) downloadImage(item.photo);
  });
  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("product_img")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setimg(url);
    } catch (error) {
      console.log(error.message);
    }
  }
  // const zid=item.id

  // function checkshow(cartItems){
  //   for(let x=0 ; x < cartItems.length ; x++){
  //     if(zid === cartItems[x].id){
  //       setshow(false)
  //     }
  //     else{setshow(true)}
  // }}

  // useEffect(()=>{
  //   checkshow(cartItems)
  // },[cartItems])

  function removetocart() {
    dispatch(decrementCart(item.name));
    setshow(true);
  }

  return (
    <div className={styles.itembox}>
      <NavLink to={`/product/${item.id}`} className={styles.itemimg}>
        <img src={img} alt={item.name} />
      </NavLink>
      <div className={styles.iteminfo}>
        <div className={styles.itemtxt}>
          <div className={styles.itemname}>
            <span>{item.name}</span>
          </div>
          <div className={styles.itemprice}>{item.price}Birr</div>
        </div>
        <div className={styles.additemtocart}>
          <BsCart
            size={30}
            style={{ display: show ? "flex" : "none" }}
            onClick={addtocart}
          />
          <BsFillCartCheckFill
            size={30}
            style={{ display: show ? "none" : "flex" }}
            onClick={removetocart}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
