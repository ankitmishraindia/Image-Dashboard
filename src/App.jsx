import { useState } from "react"
import MyContext from "./Context/Mycontext"

import { MdAddToQueue } from "react-icons/md";

import img1 from './assets/001.png';
import img2 from './assets/002.png';
import img3 from './assets/003.png';
import img4 from './assets/004.png';
import img5 from './assets/005.png';
import img6 from './assets/006.png';
import img7 from './assets/007.png';
import img8 from './assets/008.png';
import RemoveImage from "./components/RemoveImage";


function App() {
   const [layout,setLayout]=useState([])

   const [themeColor,setThemeColor]=useState('')
   const [bgColor,setBgColor]=useState('')

   //add image Layout
   function addImageLayout(){
    setLayout([img1,img2,img3,img4,img5,img6,img7,img8])
   }

   //input theme color code
   function colorCodechange(e){
     e.preventDefault();
    const value=e.target.value;
    setThemeColor(value)
   }

   //apply color to div
   function applyColor(){
    let newbgColor=`#${themeColor}`
    setBgColor(newbgColor)
    console.log(newbgColor)
   }

   const main=document.getElementById('main');
   console.log(main)

  return (
    <MyContext.Provider value={{layout,setLayout}}>
    <div className="w-full h-screen bg-gray-400 flex">
      {/* Sidebar*********** */}
    <div className="h-full w-[300px] py-5 px-4 bg-white space-y-3  fixed left-0">
            <h1 className="text-2xl font-semibold italic">IMAGE DASHBOARD</h1>
            {layout.length===0?
            (<div>
                <p>Add Layout with Images:</p>
                <button onClick={addImageLayout}  className="flex font-semibold items-center w-full justify-between">Add Layout
                <MdAddToQueue className="hover:bg-gray-200 px-2 py-1 rounded-md" size={33}/>
            </button>
            </div>)
            :''
            }
            
            <hr className="w-full"/>
           <RemoveImage/>
           
            <div className="overflow-hidden space-y-2">
                <p>Change Theme-color:</p>
                <label htmlFor="themeColor" className="font-semibold">Color-Code (eg:00ffcc(0-9,A-F))</label>
                <input value={themeColor} onChange={colorCodechange} type="text" minLength='6' maxLength={6} width='90%' name="" id="themeColor" className=" text-black border-2 px-2 py-1 rounded-md"  placeholder="00ffcc"/>
                <button onClick={applyColor} className="px-3 bg-gray-400 text-white hover:bg-gray-500 block rounded-md">OK</button>
            </div>
            <hr />
            <p>Save To LocalStorage:</p>
            <button className="bg-blue-500 text-white font-semibold w-full py-1 rounded-md hover:bg-blue-600">Save</button>
        </div>
        {/* ***********mainbar********** */}
        <div id="main" className={`p-2 bg-[#${bgColor}] w-full flex flex-wrap gap-1 ml-[300px]`}>
          {layout&&layout.map((item,index)=>(<img key={index} src={item} className={index===0||index===layout.length-1?'w-[99%] h-[19%] m-[0_auto]':'w-[49%] h-[19%] m-[0_auto]'}/>))}
        </div>
    </div>
    </MyContext.Provider>
  )
}

export default App
