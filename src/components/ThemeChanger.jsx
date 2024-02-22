import { useState } from "react";

// eslint-disable-next-line react/prop-types
function ThemeChanger({setBgColor}){

    const [themeColor,setThemeColor]=useState('')
    const [error,setError]=useState(false)

    //input theme color code
   function colorCodechange(e){
    e.preventDefault();
   const value=e.target.value;
   setThemeColor(value)
  }

  //apply color to div
  function applyColor(){
   let newbgColor=`#${themeColor}`
   const pattern=/^#[0-9a-fA-F]{6}$/
   if(pattern.test(newbgColor)){
    setBgColor(newbgColor)
  
     setThemeColor('')
     setError(false)
   }else{
    setError(true)
   }
  
   
  }
    return(
        <div className="overflow-hidden space-y-2">
        <p>Change Theme-color:</p>
        <label htmlFor="themeColor" className="font-semibold">Color-Code (eg:00ffcc(0-9,A-F))</label>
        <input value={themeColor} onChange={colorCodechange} type="text" minLength='6' maxLength={6} width='90%' name="" id="themeColor" className=" text-black border-2 px-2 py-1 rounded-md"  placeholder="00ffcc"/>
        {error&&<p className='text-red-500'>Invalid Color Code</p>}
        <button onClick={applyColor} className="px-3 bg-gray-500 text-white hover:bg-gray-400 block rounded-md">OK</button>
        
    </div>
    )
}

export default ThemeChanger;