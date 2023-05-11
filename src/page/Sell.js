import React, { useRef, useState } from "react";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Log from "../components/Log";
import { Auth } from "../store/Context";
import supabase from "../store/Supabase";
import styles from "./sell.module.css";
const Sell = () => {
  const imgRef = useRef();
  function chooseimg() {
    imgRef.current.click();
  }

  const [fillall,setfillall]=useState(true)
  const [step2,setstep2]=useState(true)
  const [error,seterror]=useState("")
  const titleRef=useRef()
  const priceRef=useRef()
  const infoRef=useRef()
  const [productimg, setproductimg] = useState();
  const [zproductimg, setzproductimg] = useState();
  const [previewUrl, setPreviewUrl] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCatagory, setSelectedCatagory] = useState(null);
  const [selectedcondition, setSelectedcondition] = useState(null);
  const[productposting,setproductposting]=useState(false)
  const {currentUser}=Auth()


  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value)
  };

  const handlecatagoryChange = (event) => {
    setSelectedCatagory(event.target.value)
  };

  const handleConditionChange = (event) => {
    setSelectedcondition(event.target.value)
  };
  
  
  function postimg(e){
    setfillall(false)
    const files = e.target.files;
    setproductimg(files[0])
    let urls = [];
    for (let i = 0; i < files.length && i < 4; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      urls.push(url);
      if (i === files.length - 1 || i === 3) {
        setPreviewUrl(urls);
      }
    }
  }

  async function postproduct(){
   if(
    titleRef.current.value && priceRef.current.value && selectedcondition !== null && infoRef.current.value
    ){
      setproductposting(true)

      
      const fileExt = productimg.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      let { error: uploadError } = await supabase.storage.from('product_img').upload(filePath, productimg)
      if (uploadError) {
        throw uploadError
      }
      setzproductimg(filePath)

      const { error } = await supabase
      .from('product')
      .insert({ catagory:selectedCatagory, 
        location:selectedLocation ,
        condition:selectedcondition ,
        name:titleRef.current.value ,
        price:priceRef.current.value ,
        info:infoRef.current.value ,
        photo:zproductimg
      })
      if(error){
        seterror(error.message)
      }
      else{
        cleardata()
      }
   }
   else{
    seterror('Please Provide All Inputs')
   }
        setproductposting(false)
  }

  function gotostep2(){
    if(selectedLocation!==null && selectedCatagory !==null){
    setstep2(false)
    seterror('')
    }
    else seterror('Select Location and Catagory')
  }
  function cleardata(){
    imgRef.current.value=null
    setstep2(true)
    titleRef.current.value=null
    infoRef.current.value=null
    priceRef.current.value=null
    setSelectedCatagory(null)
    setSelectedcondition(null)
    setSelectedLocation(null)
    seterror('')
    setfillall(true)
  }

  return (
    <>
    {currentUser
      ? <div className={styles.cont}>
        <div className={styles.adposted} style={{display:productposting?'none':'flex'}}>
          <div>Your Ad Is Posted Successfully</div>
        </div>
      <div className={styles.box}>
        <div className={styles.form}>
          <div className={styles.top}>
          <button className={styles.backlink} style={{display:step2?'none':'flex'}} onClick={()=>setstep2(true)}><BsFillArrowLeftSquareFill/> Back</button>
            <div>SELL PRODUCT</div>
            <button className={styles.clearlink} onClick={cleardata} disabled={fillall} style={{color:fillall?'rgba(255, 0, 0,0.5)':'rgb(255, 0, 0)'}}>Clear</button>
          </div>
          <div className={styles.header}>
            <div style={{background:step2?'rgb(0, 140, 255)':'rgba(255,255, 255, 1)',border:!step2?'1px solid rgb(0, 140, 255)':'none',color:!step2?'rgb(0, 140, 255)':'white'}}>step 1: Product</div>
            <div style={{background:!step2?'rgb(0, 140, 255)':'rgba(255, 255, 255, 1)',border: step2?'1px solid rgb(0, 140, 255)':'none',color:step2?'rgb(0, 140, 255)':'white'}}>step 2: Details</div>
          </div>
          <div className={styles.zbody} style={{display:step2?'flex':'none'}}>
            <select className={styles.catagory} onChange={handlecatagoryChange}>
              <option hidden value=''>Catagory</option>
              <option value='Shoes'>Shoes</option>
              <option value='Clothing'>Clothing</option>
              <option value='Phone'>Phone</option>
              <option value='Electronics'>Electronics</option>
              <option value='Pets'>Pets</option>
              <option value='Food'>Food</option>
              <option value='Properites'>Properites</option>
              <option value='Vehicles'>Vehicles</option>
            </select>
            <select className={styles.location} onChange={handleLocationChange}>
                    <option value='' hidden>Location</option>
                    <option value='Addis Abeba'>Addis Abeba</option>
                    <option value='Bahir dar'>Bahir dar</option>
                    <option value='Hawassa'>Hawassa</option>
                    <option value='Gonder'>Gonder</option>
                </select>
          </div>
          <div className={styles.zbody2} style={{display:step2?'none':'flex'}}>
           <input ref={titleRef} maxLength='37' className={styles.input} placeholder="Title"/>
           <select className={styles.location} onChange={handleConditionChange}>
              <option hidden value=''>Condition</option>
              <option value='Brand New'>Brand New</option>
              <option value='Used'>Used</option>
              <option value='Refurbished'>Refurbished</option>
            </select>
           <input ref={infoRef} maxLength='160' className={styles.postinfo} placeholder="Description" required/>
           <div className={styles.price}>
            <div>ETB</div>
           <input ref={priceRef} maxLength='5' type='number' 
           placeholder="Price"/>
           </div>
          </div>
          <div className={styles.img} style={{display:step2?'flex':'none'}}>
            <div>
            <span>Add photo</span>
            <button className={styles.chooseimg} onClick={chooseimg}>
              +
            </button>
            <input ref={imgRef} type="file" multiple style={{ display: "none" }} onChange={postimg}/>
            </div>
            {previewUrl.map((url) => (
          <img key={url} src={url} alt="preview" style={{ display:fillall? "none":'flex',maxWidth: "100px", maxHeight: "100px" }}/>
        ))}
          </div>
          <div className={styles.footer}>
            <p>{error}</p>
            <button disabled={fillall} style={{background:fillall?'rgba(0,140,255,0.5)':'rgb(0,140,255)' ,display:step2?'flex':'none'}} onClick={gotostep2}>Next</button>
            <button  style={{background:'rgb(0,140,255)',display:!step2?'flex':'none'}} disabled={productposting} onClick={postproduct}>{productposting ? "Posting Product":'Post Product'}</button>
            </div>
        </div>
      </div>
    </div>
: <Log/>
    }</>
      );
};

export default Sell;
