import React, { useEffect, useState  } from 'react';
import { SearchFuncProps} from '../types/interface'

function Search({searchFunc}:SearchFuncProps) {
  const [isMenu,setMenu] = useState<string>('none')
  const [value,setValue] = useState<string>('')

  const menuControl = () =>{
    if(isMenu === 'none'){
      setMenu('block')
    }else{
      setMenu('none')
    }
   }

   useEffect(()=>{
     console.log("vv",value)
   },[value])
   
   useEffect(()=>{

  },[isMenu])

   const boxStyle = {
     display:`${isMenu}`,
     backgroundColor: "#fff",
     border:'1px solid #000',
     height: "89px",
     width:"120px",
     position:'absolute',
  } as React.CSSProperties

  const searchStyle = {
    backgroundColor:'white',
    border:'1px solid #000',
    cursor:'pointer',
    width: '80px',
    height: '20px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '27px 15px'
  } as React.CSSProperties

  return (
    <div>
      <button onClick={()=>menuControl()} style={searchStyle}>Search</button>
      <div style={boxStyle}>
          <input style={{width:'85%',padding:'5px'}} type="text" placeholder='Search' onChange={(e)=>setValue(e.target.value)}/>
          <button onClick={()=>{searchFunc(value);menuControl();}} style={{marginTop:'10px'}}>Search</button>
      </div>
    </div>
  );
}

export default Search;