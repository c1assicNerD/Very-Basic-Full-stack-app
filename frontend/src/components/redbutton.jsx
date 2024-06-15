export default function Redbutton({label,onClick}){
    console.log("In button 2")
    return  <button onClick={onClick} type="button" className="w-full bg-red-700  font-medium text-base p-2 hover:duration-300 hover:bg-zinc-700 active:bg-zinc-600 active:duration-150 duration-300 rounded-2xl px-3 text-zinc-300">
        {label}
    </button>
}