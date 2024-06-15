export default function Inputbox({label,placeholder,onchange}){
    return <div>
        <div className="text-sm py-2 text-left font-medium  text-gray-400">{label}</div>
        <input onChange={onchange}placeholder={placeholder} className="w-full px-2 py-2   bg-transparent outline-none border-collapse text-gray-500 placeholder-gray-600 placeholder:italic focus:duration-500 
          focus:placeholder-opacity-0  duration-150 focus:text-gray-400 box-border h-10 focus:border-b border-b-gray-600 " />
    </div>
}