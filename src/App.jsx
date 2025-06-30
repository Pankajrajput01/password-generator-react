import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  

  const generate = useCallback((()=>{
    let pass = ''
    let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  
    if(numberAllowed) char += '0123456789'
    
    if(charAllowed) char += '!@#$%^&*()_+~{}[]'

    for (let i = 0; i <= length; i++) {
      const abc = Math.floor((Math.random()* char.length +1))
      pass += char.charAt(abc)
    }

    setPassword(pass)
    
  }),[numberAllowed , charAllowed , length])

  useEffect((()=>{
    generate()
  }),[generate , numberAllowed , charAllowed , length])

  const copynow = ()=>{
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black-500">
        <h1 className='text-white text-center my-3'>Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type='text'
          value={password}
          className="outline-none w-full py-1 px-3 bg-cyan-500"
          readOnly
          placeholder='your password'
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5' onClick={copynow}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            value={length}
            min={2}
            max={15}
            className='cursor-pointer'
            onChange={(e)=> {setLength(e.target.value)}}
            />
            <label className='m-2 text-white text-center'>Range : {length}</label>
            <input 
            type='checkbox'
            defaultChecked={numberAllowed}
            onChange={()=>{setNumberAllowed((pastvalue) => !pastvalue)}}
            />
            <label className='m-2 text-white text-center'>numberAllowed</label>
            <input 
            type='checkbox'
            defaultChecked={charAllowed}
            onChange={()=>{setCharAllowed((pastvalue) => !pastvalue)}}
            />
            <label className='m-2 text-white text-center'>special</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
