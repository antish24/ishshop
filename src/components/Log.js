import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../store/Context'
import styles from './log.module.css'
const Log = () => {
  const {currentAdmin,currentUser}=Auth()
  const emailRef=useRef() 
    const passwordRef=useRef()
    const {signup,login,resetPassword}=Auth()
    const navigate=useNavigate()
    const [error,setError]=useState('')
    const [errcolor,seterrcolor]=useState(true)
    const [showlogin,setlogin]=useState('')
    const [forgetpassword,setforgetpassword]=useState(true)
    const [loading,setLoading]=useState(false)

    async function handleSubmit(e){
       if(!currentUser){
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
        await signup(emailRef.current.value,passwordRef.current.value)
        navigate('/cart')
      } catch(error) {
        seterrcolor(true)
            switch(error.code){
              case "auth/invalid-email":
                setError('Invalid Email');
              break;
              case "auth/weak-password":
                  setError('Weak password');
              break;
              case "auth/email-already-in-use":
                  setError('Email already in use');
                break;
              case "auth/network-request-failed":
                  setError('No Internet');
                break;
              default: 
              setError(error.code);
            }
          }
        setLoading(false)
       }
       else{
        setError('Logout from admin first')
      }
    }

    async function handleLogin(e) {
      if(!currentAdmin){
        e.preventDefault();
        try {
          setError("");
          seterrcolor(true)
          setLoading(true);
          await login(emailRef.current.value, passwordRef.current.value);
            navigate("/cart");
        } catch(error) {
          switch(error.code){
            case "auth/invalid-email":
              setError('Invalid Email');
            break;
            case "auth/user-disabled":
                setError('Account Disabled');
            break;
            case "auth/user-not-found":
                setError("Account Not Found");
              break;
            case "auth/wrong-password":
                setError('Incorrect Password');
              break;
            case "auth/network-request-failed":
                setError('No Internet');
              break;
            default: 
            setError('something went wrong');
          }
        }
        setLoading(false);
      }
      else{
        setError('Logout from admin first')
      }
    }
    async function ResetPassword(e){
      e.preventDefault()
      try {
        setError('')
        seterrcolor(true)
        setLoading(true);
        await resetPassword(emailRef.current.value)
      } catch (error) {
        console.log(error.code)
        if(error.code==='auth/user-not-found')
          {seterrcolor(true)
            setError("User Not Found")}
          else if(error.code==="auth/missing-email" || error.code==="auth/invalid-email"){
            seterrcolor(true)
            setError("Invalid Email")
          }
          else if(error.code==="auth/network-request-failed"){
            seterrcolor(true)
            setError("No Internet")
          }
          else{
          seterrcolor(false)
            setError("Check your Email")
          }
      }
      setLoading(false);

    }
  return (
    <>
    { showlogin?
  <div className={styles.box}>
  <div className={styles.form}>
    <h1>Register</h1>
      <input placeholder='Email' autoComplete='on' ref={emailRef} />
      <input placeholder='Password'  type="password" ref={passwordRef} />
    <button disabled={loading} onClick={handleSubmit}>
    {loading ?<>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </> : "Sign up"}

    </button>
    <span style={{color:'red'}}>{error}</span>
    <div>
    Already have an account ?<span style={{color:'rgb(0,140,255'}} onClick={()=>setlogin(false)}>Log in</span>
    </div>
  </div>
</div>
:
<div>
{forgetpassword?
<div className={styles.box}>
<div className={styles.form}>
    <h1>Login</h1>
    <input placeholder='Email' ref={emailRef} />
    <input placeholder='Password' type="password" ref={passwordRef} />
   <span style={{color:'rgb(0,140,255',fontSize:"15px"}} onClick={()=>setforgetpassword(false)}>Forgot your password?</span>
  <button disabled={loading} onClick={handleLogin}>
    {loading ? <>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </> : "Login"}
  </button>
  <span style={{color:'red'}}>{error}</span>
  <div>
    don't have an account ?<span style={{color:'rgb(0,140,255'}} onClick={()=>setlogin(true)}>Sign up</span>
  </div>
</div>
</div>
:
<div className={styles.box}>
<div className={styles.form}>
    <h1>Reset Password</h1>
    <input placeholder='Email' ref={emailRef}/>
    <button disabled={loading} onClick={ResetPassword}>
    {loading ? <>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </> : "Send Email"}

  </button>
  <span style={{color:errcolor?'red':"rgb(0,140,255)"}}>{error}</span>
  <div>
    Back to 
  <span style={{color:'rgb(0,140,255'}} onClick={()=>setforgetpassword(true)}>Login</span>
  </div>
</div>
</div>
    }
</div>
  }
    </>
   
  )
}

export default Log