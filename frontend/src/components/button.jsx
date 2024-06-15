export default function Button({label,onClick}){
    return  <button onClick={onClick}type="button" className="w-full text-gray-500 bg-black font-medium text-base p-4 hover:duration-1000 active:bg-zinc-800 active:duration-150 duration-350">
        {label}
    </button>
    
}