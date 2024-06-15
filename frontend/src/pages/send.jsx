import Redbutton from "../components/redbutton"
import Heading from "../components/heading"
import Subheading from "../components/subheading"
import Inputbox from "../components/inputbox"
import axios from "axios"
import { useState } from "react"
import { useSearchParams,useNavigate } from "react-router-dom"
export default function Send(){
    const [amount,setAmount]= useState(0);
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const name = params.get("name")
    const userID = params.get("userID");
    return <div className="flex flex-col justify-center h-screen w-full bg-gradient-radial from-zinc-600 to-zinc-800">
        <div className="flex justify-center ">
            <div className=" bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-zinc-800 from-5% via-black via-55% to-zinc-800 rounded-lg shadow-xl shadow-black px-10 pt-2 pb-4 flex flex-col gap-2">
                <Heading label={"Send To -"} />
                <div className="flex gap-2 pt-5">
                     <div className="inline-flex items-center justify-center size-[36px] text-sm font-semibold leading-none rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">{name[0]}</div>
                     <div className=" font-medium text-lg text-zinc-400 pt-1 ">{name}</div>
                </div>
                <div className=" h-8">
                <Inputbox onchange={e => { setAmount(e.target.value) }} label={""} placeholder={"Amount..."}></Inputbox>
                </div>
                
                <div className="p-2"></div>
                <Redbutton onClick={async()=>{
                    const res = await axios.post("http://localhost:3000/api/v1/Account/transfer",{
                        to:userID,
                        amount
                    },{
                        headers:{
                            'authorization': "Bearer"+" "+localStorage.getItem("token")
                        }
                    })
                    navigate(`/transaction?msg=${res.msg}`)
                }} label="Send Amount"></Redbutton>
                

            </div>
        </div>
    </div>
}