import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Inputbox from "./inputbox";
import Redbutton from "./redbutton";
import axios from "axios";
import Subheading from "./subheading";
export default function Users(){
    const [users, setUsers] = useState([]);
    function onchangehandler (e){
        const filter = e.target.value;
        console.log("filter rerender")
        axios.get(`http://localhost:3000/api/v1/user/bulk?param=${filter}`)
            .then(res=>setUsers(res.data.safedoc))
    }
    return <div className="p-10">
        <Inputbox label={"Users"} placeholder={"Search users..."} onchange={onchangehandler} />
        <div className="py-5"></div>
        
        <div className="flex flex-col">{users.map(c=><User user={c}/>)}</div>
    </div>
    
}
function User({user}){
    const navigate = useNavigate()
    const alphabet  = user.Firstname[0];
    const name = `${user.Firstname} ${user.Lastname}`
    function onclickhandler(){
        navigate(`/send?userID=${user._id}&name=${user.Firstname}`);
    }
    return(
        <div className="flex justify-between gap-x-96 py-2">
            <div className="flex gap-2">
                <div className="inline-flex items-center justify-center size-[36px] text-sm font-semibold leading-none rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">{alphabet}</div>
                <div className="flex gap-1 ">
                    <Subheading label={user.Firstname}/>
                    <Subheading label={user.Lastname}/>
                    
                </div>
            </div>
            <div className=" ">
            <Redbutton label={"Send money"} onClick={onclickhandler}/>
            </div>
        </div>
    )
}