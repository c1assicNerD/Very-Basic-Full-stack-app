import { Link } from "react-router-dom";

export default function Bottomwarning({label,buttontext,to}){
    return <div className="text-gray-400 italic font-light flex justify-center pt-2 text-sm">
            <div> {label}</div>
        <Link className=" cursor-pointer pointer underline pl-1 font-normal text-gray-400 " to={to}>{buttontext}</Link>
    </div>
}