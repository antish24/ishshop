import styles from './searchresult.module.css'
import React, { useEffect, useState } from "react";
import {BsCart, BsFillCartCheckFill} from 'react-icons/bs'
import { NavLink } from "react-router-dom";
import {useDispatch } from 'react-redux';
import { incrementCart,decrementCart } from "../store/cartSlice";
import supabase from '../store/Supabase';

const SearchResult = (l) => {
    const [show,setshow]=useState(true)
    const [img,setimg]=useState(true)
    const dispatch = useDispatch();
  
    function addtocart(){
      dispatch(incrementCart(l))
      setshow(false)
      }
  
    function removetocart(){
      dispatch(decrementCart(l.name))
      setshow(true)
      }
      useEffect(() => {
        if (l.photo) downloadImage(l.photo);
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
    <div className={styles.box}>
        <NavLink to={`/product/${l.id}`} className={styles.img}>
            <img src={img} alt={l.name}/>
        </NavLink>
        <div className={styles.info}>
        <div className={styles.catagory}>{l.catagory}</div>
        <div className={styles.name}>{l.name}</div>
        <div className={styles.price}>{l.price}Birr</div>
        <div className={styles.addTocart}>
        <BsCart size={30} style={{display:show?'flex':'none'}} onClick={addtocart}/>
          <BsFillCartCheckFill size={30} style={{display:show?'none':'flex'}} onClick={removetocart}/>
        </div>
        </div>
    </div>
  )
}

export default SearchResult