import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  
  const [length, setLength] = useState(7)
  const [numberAllowed, setNUmberAllowed] = useState(false)
  // using false in useState in default value because is number is tick or not tick but in default it is not tick

  const [charAllowed,setCharAllowed] = useState(false)
  const [copyval, setCopyval] = useState("red") 
  const [Password, setPassword] = useState("")
  
  // useRef hook
  const passwordRef = useRef(null)
 

  const passwordGerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed)
    str += "0123456789"

    if(charAllowed)
    str += "~!@#$%^&*()-_+={}[]|\:;'<>,.?/"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
     // console.log(char)
      pass += str.charAt(char)
   
    }
    
    setPassword(pass)

  } ,[length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(Password)
    setCopyval((prev) => (!prev))

  },[Password])
  
  useEffect(() => {
    passwordGerator()
  }, [length, numberAllowed, charAllowed])

  //  passwordGerator()
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800
      '>
       <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
       <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' style={{backgroundColor: copyval}}>copy</button>
        </div>
       <div className='flex items-center gap-x-1'>
        <input 
        type="range" 
         min = {6}
         max = {100}
         value = {length}
         className = 'cursor-pointer'
         onChange={(vishal) => {setLength(vishal.target.value)}}
         />
         <label>Length: {length}</label>
       
       <div className='flex items-center gap-x-1'>
        <input
                type="checkbox"
                defaultChecked = {numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNUmberAllowed((prev) => !prev);
                }}
         />
      <label htmlFor="numberInput">Numbers</label>
       </div>
       <div className='flex items-center gap-x-1'>
        <input
                type="checkbox"
                defaultChecked = {charAllowed}
                id='characterInput'
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
         />
      <label htmlFor="characterInput">Characters</label>
       </div>
      
      </div>
      </div>

    </>
  )
}

export default App
