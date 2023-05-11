import React, { useRef, useState,useEffect } from "react";
import { Auth } from "../store/Context";
import supabase from "../store/Supabase";
import styles from "./adminpage.module.css";
import {
    FaCartArrowDown,
  FaCheck,
  FaLocationArrow,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AdminPage = () => {
  const { currentAdmin, Adminlogin, currentUser } = Auth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteshow, setdeleteshow] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [product, setproduct] = useState([]);

  useEffect(()=>{
    getTransaction();
  getProduct();
  },[currentAdmin])

  async function handleLogin(e) {
    if (!currentUser) {
      e.preventDefault();
      try {
        setError("");
        setLoading(true);
        await Adminlogin(emailRef.current.value, passwordRef.current.value);
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid Email");
            break;
          case "auth/user-disabled":
            setError("Account Disabled");
            break;
          case "auth/user-not-found":
            setError("Account Not Found");
            break;
          case "auth/wrong-password":
            setError("Incorrect Password");
            break;
          case "auth/network-request-failed":
            setError("No internet");
            break;
          default:
            setError("something went wrong");
        }
      }
      setLoading(false);
    } else {
      setError("Logout from User First");
    }
  }

  async function getTransaction() {
    const { data, error } = await supabase.from("boughtproduct").select();
    if (data) {
      setTransaction(data);
    } else {
      console.log(error);
    }
  }

  async function getProduct() {
    const { data, error } = await supabase.from("product").select();
    if (data) {
      setproduct(data);
    } else {
      console.log(error);
    }
  }

  async function deleteZproduct(e){
    setLoading(true)
    const { error } = await supabase
    .from('product')
    .delete()
    .eq('id', e)
    if(error){
      setError('error')
    }
    else{
    setdeleteshow(false)
    }
    setLoading(false)
  }

  return (
    <div className={styles.cont}>
      <div className={styles.box}>
        {!currentAdmin ? (
          <div className={styles.adminlog}>
            <div className={styles.form}>
              <h1>Hey Admin</h1>
              <input ref={emailRef} placeholder="UserName" />
              <input ref={passwordRef} type='password' placeholder="Password" />
              <button disabled={loading} onClick={handleLogin}>
                {loading ? (
                  <>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
              <span style={{ color: "red" }}>{error}</span>
            </div>
          </div>
        ) : (
          <div className={styles.adminbody}>
            <div className={styles.leftbar}>
              <a href="#location">
                <FaLocationArrow />
              </a>
              <a href="#product">
                <FaCartArrowDown />
              </a>
            </div>
            <div className={styles.deliverylist} id="location">
              <h1>Delivery Lists</h1>
              <div className={styles.maplist}>
                {transaction.length > 0 ? (
                  <>
                    {transaction.map((l) => {
                      return (
                        <div className={styles.deliveybox}>
                          <div className={styles.location}>
                            Location : {l.location}
                          </div>
                          <div className={styles.phone}>Phone : {l.phone}</div>
                          <div className={styles.infoproduct}>
                            <FaCheck />
                          </div>
                          <div className={styles.donedelivery}>
                          <span>{l.status}</span>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className={styles.deliveyboxempty}>
                      <div className={styles.locatione}></div>
                      <div className={styles.phonee}></div>
                      <div className={styles.infoproducte}></div>
                      <div className={styles.donedeliverye}></div>
                    </div>
                    <div className={styles.deliveyboxempty}>
                      <div className={styles.locatione}></div>
                      <div className={styles.phonee}></div>
                      <div className={styles.infoproducte}></div>
                      <div className={styles.donedeliverye}></div>
                    </div>
                    <div className={styles.deliveyboxempty}>
                      <div className={styles.locatione}></div>
                      <div className={styles.phonee}></div>
                      <div className={styles.infoproducte}></div>
                      <div className={styles.donedeliverye}></div>
                    </div>
                    <div className={styles.deliveyboxempty}>
                      <div className={styles.locatione}></div>
                      <div className={styles.phonee}></div>
                      <div className={styles.infoproducte}></div>
                      <div className={styles.donedeliverye}></div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className={styles.productlist} id="product">
              <h1>Products</h1>
              <div className={styles.mapproduct}>
                {product.length > 0 ? (
                  <>
                    {product.map((l) => (
                      <div className={styles.productbox}>
                        <div className={styles.img}>
                          <img src={l.photo} alt="product" />
                        </div>
                        <div className={styles.info}>
                          <div className={styles.name}>{l.name}</div>
                          <div className={styles.price}>{l.price}$</div>
                          <div className={styles.catagory}>{l.catagory}</div>
                          <div className={styles.loc}>{l.location}</div>
                        </div>
                        <div className={styles.deleteproduct}>
                          <MdDelete size={30} onClick={()=>setdeleteshow(true)}/>
                        </div>
                        <div style={{display:deleteshow?'flex':'none'}} className={styles.confirmdelete}>
                          <button className={styles.cancle} onClick={()=>setdeleteshow(false)}>Cancel</button>
                          <button className={styles.delete} onClick={()=>deleteZproduct(l.id)}>{loading?'Deleting':'Delete'}</button>
                          {error}
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className={styles.productboxe}>
                      <div className={styles.imge}>
                        <img src="h" alt="product" />
                      </div>
                      <div className={styles.infoe}>
                        <div className={styles.namee}></div>
                        <div className={styles.pricee}></div>
                        <div className={styles.catagorye}></div>
                        <div className={styles.loce}></div>
                      </div>
                      <div className={styles.deleteproducte}></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
