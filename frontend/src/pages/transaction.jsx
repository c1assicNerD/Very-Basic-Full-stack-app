import { useCallback, useState,memo,useEffect } from "react";
import { useSearchParams,useNavigate, Navigate } from "react-router-dom";
import Heading from "../components/heading";
import Subheading from "../components/subheading";

export default function Transaction(){
    const [param] = useSearchParams();
    const[count,setCount] = useState(10)
    const navigate = useNavigate();
    const message = param.get("msg")
    const setcount = useCallback(setCount,[]);
    return<div className=" flex flex-col justify-center h-screen w-full bg-gradient-radial from-zinc-600 to-zinc-800">
     <div className="flex justify-center ">
     <div className=" bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-zinc-800 via-black to-zinc-800 rounded-lg shadow-xl shadow-black px-10 pt-2 pb-4">
        <Heading label={"Status"}/>
        <Subheading label ={message}/>
        <Counter/>
    </div>
    </div>
    </div>
}

const Counter = function(){
    const [count,setCuont] = useState(10)
    const navigate = useNavigate()
    
    console.log("Counter component rerenders")
   useEffect( ()=>{
    if(count===0) return navigate("/dashboard")
        console.log("Inside effect")
    setTimeout(()=>{
        setCuont(count-1)
    },1000)},[count]);
    
    
    return <div>
        <div className="text-zinc-400">You will be redirected in ...{count}</div>
    </div>
}
