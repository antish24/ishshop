import React, { useContext,useState,useEffect } from 'react'

import { user, Admin } from './Fire'

const AuthContext=React.createContext()
export const Auth=()=>{
    return useContext(AuthContext)
}

export const Context = ({children}) => {
const[loading,setLoading]=useState(true)
const[currentUser,setCurrentUser]=useState()
const[currentAdmin,setCurrentAdmin]=useState()
function signup(email,password){
   return user.createUserWithEmailAndPassword(email,password)
}
function login(email,password){
    return user.signInWithEmailAndPassword(email,password)
}
function Adminlogin(email,password){
    return Admin.signInWithEmailAndPassword(email,password)
}
function resetPassword(email){
    return user.sendPasswordResetEmail(email)
}
function logout(){
    return user.signOut()
}
function Adminlogout(){
    return Admin.signOut()
}
useEffect(()=>{
    const unsub=user.onAuthStateChanged(user=>{
        setCurrentUser(user)
        setLoading(false)
    })
    return unsub
},[])

useEffect(()=>{
    const unsub=Admin.onAuthStateChanged(user=>{
        setCurrentAdmin(user)
        setLoading(false)
    })
    return unsub
},[])

    const values={
        currentUser,
        currentAdmin,
        signup,
        login,
        resetPassword,
        logout,
        Adminlogout,
        Adminlogin
    }

  return (
    <AuthContext.Provider value={values}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default Context