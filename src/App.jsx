import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  let [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copy , setcopy] = useState("false")

  const generate = useCallback(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+~{}[]";

    let charPool = letters;
    let fixedSpecials = "";
    let finalPassword = "";

    if (numberAllowed) {
      charPool += numbers;
    }

    if (charAllowed) {
      for (let i = 0; i < 3; i++) {
        const randIndex = Math.floor(Math.random() * specialChars.length);
        fixedSpecials += specialChars.charAt(randIndex);
      }
    }

    const remainingLength = length - fixedSpecials.length;

    let rest = "";
    for (let i = 0; i < remainingLength; i++) {
      const randIndex = Math.floor(Math.random() * charPool.length);
      rest += charPool.charAt(randIndex);
    }

    const combined = (fixedSpecials + rest).split("");
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    setPassword(combined.join(""));
      


  }, [numberAllowed, charAllowed, length]);

  useEffect(() => {
    generate();
  }, [generate, numberAllowed, charAllowed, length]);

  const copynow = () => {
    window.navigator.clipboard.writeText(password);
    setcopy(true)

    setTimeout(() => {
    setcopy(false);
  }, 1500);
    
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-cyan-500"
            readOnly
            placeholder="your password"
          />
          <button
            onClick={copynow}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 
            ${copy ? "bg-green-600 text-white" : "bg-blue-700 text-white"}'
          >
          {copy ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              value={length}
              min={4}
              max={15}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="m-2 text-white text-center">
              Range : {length}
            </label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((pastvalue) => !pastvalue);
              }}
            />
            <label className="m-2 text-white text-center">numberAllowed</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((pastvalue) => !pastvalue);
              }}
            />
            <label className="m-2 text-white text-center">special</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
