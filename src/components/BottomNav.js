import React from 'react'
import styles from './bottomnav.module.css'
import { NavLink } from 'react-router-dom'
import { Auth } from '../store/Context'
import { useNavigate } from "react-router-dom";
import { FaHome, FaShopify } from 'react-icons/fa';
import { MdAdminPanelSettings, MdCategory, MdLogout, MdPerson, MdSell, MdShop } from 'react-icons/md';


const BottomNav = () => {
  const {currentUser,currentAdmin,Adminlogout,logout}=Auth()
  const navigate=useNavigate()

  async function adminlogout() {
    try {
      await Adminlogout();
      navigate("/");
    } catch {
      alert("failed to log out");
    }
  }
  async function handlelogout() {
    try {
      await logout();
      navigate("/");
    } catch {
      alert("failed to log out");
    }
  }

  return (
    <div className={styles.box}>
         <NavLink to='/' className={styles.link}><FaHome size={25}/></NavLink>
                <NavLink to='/catagory' className={styles.link}><MdCategory size={25}/></NavLink>
                <NavLink to='/shop' className={styles.link}><MdShop size={25}/></NavLink>
                <NavLink to='/sell' className={styles.link}><FaShopify size={25}/></NavLink>
             <div className={styles.port}>
             {currentUser ?
               <button onClick={handlelogout}><MdLogout/></button>
               :
               <>{currentAdmin ?
                 <> <NavLink to='/adminpage'><MdAdminPanelSettings size={25}/></NavLink><button style={{color:'red',marginLeft:'7px'}} onClick={adminlogout}><MdLogout size={25}/></button> </>
                  :
                  <><NavLink to='/adminpage'><MdAdminPanelSettings size={25}/></NavLink> <NavLink to='/log'><MdPerson size={25}/></NavLink></>}
                </>
              }
             </div>
    </div>
  )
}

export default BottomNav