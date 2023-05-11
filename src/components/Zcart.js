import React, { useEffect, useState } from "react";
import styles from "./zcart.module.css";
import { MdDelete } from "react-icons/md";
import {useDispatch } from "react-redux";
import { decrementCart } from "../store/cartSlice";
import supabase from "../store/Supabase";

const Zcart = ({ photo, name, price }) => {
  const [itemcount, setitemcount] = useState(1);
  const [subtotal, setsubtotal] = useState();
  const [img, setimg] = useState();
  const dispatch = useDispatch();
  function additem() {
    if (itemcount <= 10) {
      setitemcount((n) => n);
      // setitemcount((n) => n + 1);
    }
    
  }
  function minusitem() {
    if (itemcount > 1) {
      // setitemcount((n) => n - 1);
      setitemcount((n) => n);
    }
  }

  useEffect(() => {
    function Subtotal() {
      setsubtotal(price * itemcount);
    }
    Subtotal();
  }, [itemcount,price]);

  useEffect(() => {
    if (photo) downloadImage(photo);
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
  return (
    <div className={styles.cartheader}>
      <div className={styles.image}>
        <img width="40px" height="50px" src={img} alt={name} />
      </div>
      <div className={styles.product}>{name}</div>
      <div className={styles.price}>{price}$</div>
      <div className={styles.quantity}>
        <div>
          <button onClick={minusitem}>-</button>
          <span>{itemcount}</span>
          <button onClick={additem}>+</button>
        </div>
      </div>
      <div className={styles.subtotal}>{subtotal}</div>
      <div className={styles.remove}>
        <MdDelete size={30} onClick={() => dispatch(decrementCart(name))} />
      </div>
    </div>
  );
};

export default Zcart;
