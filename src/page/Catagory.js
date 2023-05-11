import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Card from '../components/Card'
import supabase from '../store/Supabase'
import styles from './catagory.module.css'

const Catagory = () => {
  const [catagoryName,setcatagoryName]=useState('Electronics')
  const[file,setfile]=useState(null)
  // const [error,seterror]=useState()

  function setCatagory(e){
    setcatagoryName(e)
  }

  async function getproduct(){
    const {data}= await supabase
    .from('product')
    .select()
    .eq('catagory',catagoryName)
    if(data){
      setfile(data)
    }
    else {console.log('net')}
  }

  useEffect(()=>{
    getproduct()
  },[catagoryName])

  return (
    <div className={styles.cont}>
      <div className={styles.box}>
      <div className={styles.catagorylists}>
        <NavLink onClick={()=>setCatagory('Electronics')}>Electronics</NavLink>
        <NavLink onClick={()=>setCatagory('Clothing')}>Clothing</NavLink>
        <NavLink onClick={()=>setCatagory('Shoes')}>Shoes</NavLink>
        <NavLink onClick={()=>setCatagory('Phone')}>Phones</NavLink>
        <NavLink onClick={()=>setCatagory('Vehicles')}>Vehicles</NavLink>
        <NavLink onClick={()=>setCatagory('Pets')}>Pets</NavLink>
        <NavLink onClick={()=>setCatagory('Food')}>Food</NavLink>
        <NavLink onClick={()=>setCatagory('Properites')}>Property</NavLink>
      </div>
      <div className={styles.catagorytitle}><h1>{catagoryName}</h1></div>
      <div className={styles.products}>
      {(file ===null ||file.length < 1)?
      <div className={styles.emptyproduct}>
        <h1>No Products</h1>
        <div className={styles.emptycardbox}>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
        </div>
      </div>:<div className={styles.mapproduct}>
      {file.map((list)=><Card  {...list}/>)}
      </div>
      }
      </div>
    </div>
    </div>
  )
}

export default Catagory