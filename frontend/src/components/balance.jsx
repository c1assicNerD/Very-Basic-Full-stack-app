import axios from "axios";
import { useEffect ,useState} from "react";

export default function Balance(){
    const [balance,setBalance] = useState(0);
    useEffect(()=>{
       setTimeout(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res=>{
                
                setBalance(res.data.Balance);
            })
       },10000) 
    },[Balance])
    return <div className="text-zinc-400 font-semibold flex flex-row justify-start gap-20 p-10">
        
        Your Balance is- <div className=" font-bold "><div>{"Rs"}<span className="pr-1"/>{balance}</div></div>
    </div>
}