import React, { useRef,useState } from 'react'
import './password.css'


function Passwordgenerator() {

    const symbolsCase = useRef(null)
    const lowerCase = useRef(null)
    const upperCase = useRef(null)
    const numbers = useRef(null)
    const passwordLength = useRef(null)
    const passGenerate = useRef(null)
    const results = useRef(null)

    const [data, setData] = useState(10)


    const getRandomUpper=()=>{
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    }
    const getRandomLower=()=>{
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
    }
    const getRandomNumber = () => {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
    }
    const getRandomSymbols =() =>{
        const symbols = '!@#$%^&*()_{}[]=<>/'
        return symbols[Math.floor(Math.random() * symbols.length)]
    }
    console.log(getRandomSymbols())


    const rendomFunction ={
        upper:getRandomUpper,
        lower:getRandomLower,
        number: getRandomNumber,
        symbol: getRandomSymbols
    }

    const handleOnChange = ()=>{
        const length = +passwordLength.current.value;
        const hasLowercase =lowerCase.current.checked;
        const hasUppercase =upperCase.current.checked;
        const hasNumber = numbers.current.checked;
        const hasSymbol = symbolsCase.current.checked;

        results.current.innerText = generatePassword(hasLowercase,hasUppercase,hasNumber,hasSymbol,length)
    }



    const generatePassword=(lower, upper, number, symbol , length)=>{
        let generatedPassword = '';

        const typeCount = lower + upper + number + symbol;
        const typeArray = [{lower},{upper},{number},{symbol}].filter(item => Object.values(item)[0])
     
        if(typeCount == 0) {
          return "";
        }
        for(let i = 0 ; i < length ; i+=typeCount){
            typeArray.forEach(type=>{
              const funcName = Object.keys(type)[0]
              generatedPassword += rendomFunction[funcName]()
            })
          }
          const finalPassword = generatedPassword.slice(0,length)
          return finalPassword;

    }
    const copyPassword = () => {
        const textarea = document.createElement("textarea")
        const password = results.current.innerText
    
        if(!password){
          return
        }
        textarea.value = password
        document.body.appendChild(textarea)
        textarea.select()
        navigator.clipboard.writeText(textarea.value);
        textarea.remove()
        alert("Password copied to clipboard");
      }
    
      const handleValue = (e) => {
        if(e.target.value >=4 && e.target.value<20){
          setData(e.target.value)
        }else{
          setData(4)
        }
      }
  return (
    <>
        <div className="container">
            <h2>password generator</h2>
            <div className="result-container">
                <span className='result' ref={results}></span>
                <button className='btn' id='clipboard' onClick={copyPassword}>
                    <i className='far fa-clipboard'></i>
                </button>
            </div>
            <div className="settings">
                <div className="setting">
                    <label htmlFor="">password length</label>
                    <input type="number" min="4" id="length" max="20" value={data} onChange={(e)=>handleValue(e)} ref={passwordLength}/>
                </div>
                <div className="setting">
                    <label htmlFor="">Include uppercase letters</label>
                    <input type="checkbox" name="" id="uppercase" ref={upperCase} />
                </div>
                <div className="setting">
                    <label htmlFor="">Include lowercase letters</label>
                    <input type="checkbox" name="" id="lowercase" ref={lowerCase} />
                </div>
                <div className="setting">
                    <label htmlFor="">Include numbers </label>
                    <input type="checkbox" name="" id="numbers" ref={numbers} />
                </div>
                <div className="setting">
                    <label htmlFor="">Include symbols</label>
                    <input type="checkbox" name="" id="symbols" ref={symbolsCase} />
                </div>
            </div>
            <button className="btn btn-large" id="generate" ref={passGenerate} onClick={(e)=>handleOnChange(e)}>
                Generate Password
            </button>
        </div>
    </>
  )
}

export default Passwordgenerator