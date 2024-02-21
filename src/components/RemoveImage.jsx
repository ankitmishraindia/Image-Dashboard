import { useContext } from "react"
import MyContext from "../Context/Mycontext"
import { IoMdRemoveCircle } from "react-icons/io";

function RemoveImage(){
            
     const {layout,setLayout}=useContext(MyContext)

     //remove image
     function removeImage(index){
        setLayout((state)=>
        state.filter((_,idx)=>idx!==index))
     }

    return(
        
       <div className="space-y-2">
           
                
                {layout.length>0&&(<div>
                    <p>Remove Image:</p>
                   {layout.map((_,index)=><button onClick={()=>removeImage(index)} key={index} className="flex font-semibold items-center w-full justify-between">Image {index+1}
                    <IoMdRemoveCircle className="hover:bg-gray-200 px-2 py-1 rounded-md text-red-500" size={33}/>
                </button>)} 
                <hr />
                </div>)}
                
              
               
            </div>
            
        
            
    )
}

export default RemoveImage;