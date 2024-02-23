import { useEffect, useState } from "react"
import MyContext from "./Context/Mycontext"
import { MdAddToQueue, MdMenu, MdClose } from "react-icons/md"; // Import menu icon


import img1 from './assets/001.png';
import img2 from './assets/002.png';
import img3 from './assets/003.png';
import img4 from './assets/004.png';
import img5 from './assets/005.png';
import img6 from './assets/006.png';
import img7 from './assets/007.png';
import img8 from './assets/008.png';
import RemoveImage from "./components/RemoveImage";
import ThemeChanger from "./components/ThemeChanger";

function App() {
   const [layout,setLayout]=useState([])

   const [bgColor,setBgColor]=useState('')
   const [showSidebar, setShowSidebar] = useState(false); // State variable to track sidebar visibility


   //Saving to localstorage
   function localSaving(){
     localStorage.setItem('Layout',JSON.stringify(layout))
     localStorage.setItem('ChangedBgColor',bgColor)
     console.log(localStorage)
   }

   //add image Layout
   function addImageLayout(){
    setLayout([img1,img2,img3,img4,img5,img6,img7,img8])
   }

   //handge image drag starting
   function handleDragStart(e,index){
     e.dataTransfer.setData("index",index.toString())
   }

   //handle image dropping
   function handleDrop(e,newIndex){
      const oldIndex=parseInt(e.dataTransfer.getData('index'))
      const newLayout=[...layout]
      const [draggedElement]=newLayout.splice(oldIndex,1)
      console.log(draggedElement)
      newLayout.splice(newIndex,0,draggedElement)
      setLayout(newLayout)
   }

   // Function to toggle sidebar visibility
   const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
 };

   //rendering saved data from localstorage
   useEffect(()=>{
     const savedLayout=JSON.parse(localStorage.getItem("Layout"))
     const savedBgColor=localStorage.getItem("ChangedBgColor")
     if(savedLayout&&savedBgColor){
      setLayout(savedLayout)
      setBgColor(savedBgColor)
     }
   },[])

  return (
    <MyContext.Provider value={{layout,setLayout}}>
    <div className="w-full h-screen bg-gray-400 flex">

      {/* Menu button */}
      {!showSidebar&&<MdMenu onClick={()=>toggleSidebar()} className="fixed hover:bg-gray-100 cursor-pointer top-2 left-2 text-black bg-white rounded-md px-2 py-1" size={33}/>}

      {/* Close button */}
      {showSidebar && (
        <MdClose onClick={toggleSidebar} className="fixed hover:bg-gray-100 cursor-pointer top-2 right-2 text-black bg-white rounded-md px-2 py-1 z-20" size={33}/>
      )}
      
      {/* ***************Sidebar*********** */}
    <div className={`h-full overflow-y-auto w-[35%] sm:w-[23%] py-5 px-1 md:px-4 bg-white space-y-3 fixed z-10 left-0 ease-linear duration-500 transition-transform transform ${showSidebar ? '' : '-translate-x-full sm:translate-x-0'}`}>
            <h1 className="text-md sm:text-xl md:text-2xl text-center font-semibold italic">IMAGE DASHBOARD</h1>
            {layout.length===0?
            (<div>
                <hr/>
                <p>Add Layout with Images:</p>
                <button onClick={addImageLayout}  className="flex font-semibold items-center w-full justify-between">Add Layout
                <MdAddToQueue className="hover:bg-gray-200 px-2 py-1 rounded-md" size={33}/>
            </button>
            </div>)
            :''
            }
            
            <hr className="w-full"/>
            {/* ****remove image component */}
           <RemoveImage/>
           
           {/* ******change theme color component */}
            <ThemeChanger setBgColor={setBgColor}/>
            <hr />
            {layout.length>0&&<div>
              <p>Save To LocalStorage:</p>
            <button onClick={localSaving} className="bg-blue-500 text-white font-semibold w-full py-1 rounded-md hover:bg-blue-600">Save</button>
            </div>}
           
            
        </div>
        {/* ***********mainbar********** */}
        <div  className={`p-2 w-full flex flex-wrap gap-1 sm:ml-[23%]`} style={{ backgroundColor: bgColor }}>
          {(layout.length>0)?layout.map((item,index)=>(<img key={index} 
                                              src={item} 
                                              draggable='true'
                                              onDragStart={e=>handleDragStart(e,index)}
                                              onDragOver={e=>e.preventDefault()}
                                              onDrop={e=>handleDrop(e,index)}
                                              className={index===0||index===layout.length-1?'w-[99%] h-[19%] m-[0_auto]':'w-[49%] h-[19%] m-[0_auto]'}/>)):<p className="w-full h-full flex items-center justify-center text-white text-xl">Click To add layout.</p>}
        </div>
    </div>
    </MyContext.Provider>
  )
}

export default App
