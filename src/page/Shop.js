import React, { useEffect, useState } from 'react'
import Card from '../components/Card';
import supabase from '../store/Supabase';
import styles from './shop.module.css'

const Shop = () => {
const [file,setfile]=useState([])
const [err,seterr]=useState([])

  async function getfile(){
    const { data, error } = await supabase
  .from('product')
  .select()
  .order("created_at", { ascending: false })
     if(data){
      setfile(data)
      console.log(data)
     }
     else if(error.message === 'FetchError: Failed to fetch'){
      seterr('No Internet')
     }
     else{console.log('error')}
  }
  useEffect(()=>{
    getfile()
  },[])


  return (
    <div className={styles.cont}>
    <div className={styles.box}>
        {(file ===null ||file.length < 1)?
      <div className={styles.emptyproduct}>
         <div className={styles.emptyproduct}>
        <h1>{err==='No Internet' ? "No Internet":"No Product"}</h1>
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
          <div className={styles.emptycard}>
            <div className={styles.emptyimg}></div>
            <div className={styles.emptyinfo}>
              <div className={styles.emptyname}></div>
              <div className={styles.emptyprice}></div>
            </div>
            <div className={styles.emptycart}></div>
          </div>
        </div>
      </div>
      </div>:<div className={styles.mapproduct}>
      {file.map((item)=><Card  {...item}/>)}
      </div>
      }
    </div>
    </div>
  )
}

export default Shop