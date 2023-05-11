import React, { useEffect, useRef, useState } from "react";
import styles from './topnav.module.css'
import { BsFillCartCheckFill, BsShop} from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import { selectCartItems } from "../store/cartSlice";
import { Auth } from "../store/Context";
import supabase from "../store/Supabase";
import SearchResult from './SearchResult'
const TopNav=()=>{
  const cartItems = useSelector(selectCartItems);
  const count= cartItems.length
  const {logout,currentUser ,currentAdmin,Adminlogout} =Auth(); 
  const [searchResults,setSearchResults]=useState([])
  const searchRef=useRef()
  const [closesearch,setclosesearch]=useState(false)
  const navigate=useNavigate()
  async function search(){
    if(searchRef.current.value)
    {
        const {data,error}= await supabase.from('product').select().eq('name',searchRef.current.value)
    if(data){
        setSearchResults(data)
        setclosesearch(true)
    }
    else{
        console.log(error)
    }
    }
  }
  useEffect(()=>{
    search()
  },[searchRef])

  async function handlelogout() {
    try {
      await logout();
      navigate("/");
    } catch {
      alert("failed to log out");
    }
  }
  
  function clearsearch(){
    searchRef.current.value=null
    setclosesearch(false)
  }
  async function adminlogout() {
    try {
      await Adminlogout();
      navigate("/");
    } catch {
      alert("failed to log out");
    }
  }

    return(
        <div className={styles.cont}>
            <div className={styles.box}>
            <div className={styles.logotxt}>ISHSHOP</div>
            <div className={styles.logo}><BsShop/></div>
            <div className={styles.links}>
                <NavLink to='/' className={styles.link}>Home</NavLink>
                <NavLink to='/catagory' className={styles.link}>Catagories</NavLink>
                <NavLink to='/shop' className={styles.link}>Shop</NavLink>
                <NavLink to='/sell' className={styles.link}>Sell</NavLink>
                {/* <NavLink to='/adminpage'>Admin</NavLink> */}
                
            <div className={styles.searchbox}>
            <input ref={searchRef} onChange={search} placeholder="Enter to Search" text='text'/>
                <div className={styles.searchlist} style={{display:closesearch ?'block':'none'}}>
                    <div className={styles.maplist}>
                    {searchResults.map((l)=><SearchResult {...l}/>)}
                    </div>
                    <div className={styles.searchall}>
                        <button onClick={clearsearch} style={{background:'red'}}>Close</button>
                    </div>
                </div>
            </div>
            <div style={{width:currentUser?'100px':'130px'}} className={styles.port}>
              {currentUser ?
               <button onClick={handlelogout}>logout</button>
               :
               <>{currentAdmin ?
                 <> <NavLink to='/adminpage'>Admin</NavLink><button onClick={adminlogout}>logout</button> </>
                  :
                  <><NavLink to='/adminpage'>Admin</NavLink> <NavLink to='/log'>Customer</NavLink></>}
                </>
              }
            </div>
            <NavLink to='/cart' className={styles.cart}><BsFillCartCheckFill size={20} /><div className={styles.countitem}>{count}</div></NavLink>
            </div>
        </div>
        </div>
    )
}

export default TopNav