'use client'
import React from 'react'
import { useState } from "react"

export default function Home() {
 const [number, setNumber] =useState(0)
 const [number02, setNumber02] =useState(0)
 const [plus, setPlus] =useState(0)


    

 const test01 = (name) => {    
    console.log(name.num1 + "증가된 수치 test02 함수")        
    console.log(name.num1 + "증가된 수치 test03 함수")    
    
    console.log(name.num1 + name.num2 + '두개의 함수를 합친 수')         
    setPlus(name.num1 + name.num2)
    


    // console.log()
}
  
const test02 = () => {
    setNumber(number + 1)     
    test01({
        num1:number +1,
        num2:number02
    })        
}

const test03 = () => {
    setNumber02(number02 + 1)     
    test01({
        num1:number02 +1,
        num2:number

    })        
}


    return (
    <div className='pt-16'>
    <div>page</div>
        <div>
        {number}
        </div>
        <button onClick={test02}> test02</button>
        <button onClick={test03}> test03</button>

        <div>
        {number02}
        </div>

        <div>
        {plus}
        </div>
  


    </div>
  )
}
