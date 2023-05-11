import React, { useEffect } from 'react'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import Zitempage from './page/Zitempage'
import { Route, Routes} from 'react-router-dom'
import Cart from './page/Cart'
import Catagory from './page/Catagory'
import NotFound from './page/NotFound'
import Home from './page/Home'
import Shop from './page/Shop'
import Sell from './page/Sell'
import DeliveryPage from './page/DeliveryPage'
import Log from './components/Log'
import AdminPage from './page/AdminPage'
// import { Auth } from './store/Context'

const App = () => {
  // const navigate=useNavigate()
  // const{currentUser}=Auth()
  // useEffect(()=>{
  //   currentUser?navigate('/shop'):navigate('/log')
  // },[currentUser,navigate])
  return (
    <div>
      <TopNav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/catagory' element={<Catagory/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/log' element={<Log/>}/>
        <Route path='/sell' element={<Sell/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/deliverypage' element={<DeliveryPage/>}/>
        <Route path='/adminpage' element={<AdminPage/>}/>
        <Route path='/product/:id' element={<Zitempage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <BottomNav/>
      </div>
  )
}

export default App