import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import supabase from '../store/Supabase';
import styles from './shop.module.css'

const SearchPage = () => {
const [file,setfile]=useState([])
const [err,seterr]=useState([])
const params=useParams()
  async function getfile(){
    const { data, error } = await supabase
  .from('product')
  .select()
  .order("created_at", { ascending: false })
  .eq('name',params.name)
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
        {file.map((item)=><Card  {...item}/>)}
        {file===null && 'nothing'}
    </div>
    <span>{err}</span>
    </div>
  )
}

export default SearchPage