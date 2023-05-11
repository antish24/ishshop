import React, { useEffect, useState } from 'react'
import styles from './zitempage.module.css'
// import ImageGallery from 'react-image-gallery';
// import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from 'react-router-dom';
import supabase from '../store/Supabase';
import { incrementCart,decrementCart } from "../store/cartSlice";
import {BsCart, BsFillCartCheckFill} from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import Card from '../components/Card';

const Zitempage = () => {
  const params=useParams()
  const [catagory,setcatagory]=useState()
  const [file,setfile]=useState([])
  const [info,setinfo]=useState([])
  const [pname,setpname]=useState([])
  const [price,setprice]=useState([])
  const [photo,setphoto]=useState([])
  const [img,setimg]=useState()
  const [zrecommend,setrecommend]=useState([])
  async function getfile(){
    const{ data,error } = await supabase
    .from('product')
    .select()
    .eq('id',params.id)
     if(data){
      setpname(data[0].name)
      setinfo(data[0].info)
      setfile(data[0])
      setprice(data[0].price)
      setcatagory(data[0].catagory)
      setphoto(data[0].photo)
     }
     else console.log(error)
  }
  
  useEffect(()=>{
    getfile()
    recommend()
  },[])

  async function recommend(){
    const {data}=await supabase
    .from('product')
    .select()
    .neq('name',pname)
    .eq('catagory',catagory)
    if(data){
      setrecommend(data)
    }
  }

  const [show,setshow]=useState(true)
  const dispatch = useDispatch();
  function addtocart(){
    dispatch(incrementCart(file))
    setshow(false)
  }
  function removetocart(){
    dispatch(decrementCart(pname))
    setshow(true)
  }
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
    <div className={styles.cont}>
      <div className={styles.box}>
        <div className={styles.zimg}><img src={img} alt={pname}/></div>
        <div className={styles.detail}>
          <div className={styles.catagory}>Category:{catagory}</div>
          <div className={styles.pname}>{pname}</div>
          <div className={styles.price}>{price} Birr</div>
          <div className={styles.addtocart}>
            Add To Cart
          <BsCart
            size={30}
            style={{ display: show ? "flex" : "none" ,cursor:'pointer'}}
            onClick={addtocart}
          />
          <BsFillCartCheckFill
            size={30}
            style={{ display: show ? "none" : "flex" ,cursor:'pointer'}}
            onClick={removetocart}
          />
          </div>
          <div className={styles.info}>{info}</div>
        </div>
      </div>
      <div className={styles.recommend}>
      {zrecommend.length > 0 ?
      <>
      <div className={styles.titlereco}>Recommended</div>
      {zrecommend.map((l)=><Card {...l}/>)}
      </>
      :<>
      <div className={styles.titlereco}>Recommended</div>
      <div className={styles.emptycardbox}>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
        </div>
        <div className={styles.emptycardbox}>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
        </div>
        <div className={styles.emptycardbox}>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
        </div>
        <div className={styles.emptycardbox}>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
        </div>
        <div className={styles.emptycardbox}>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
        </div>
        </>
        }
        </div>
    </div>
  )
}

export default Zitempage