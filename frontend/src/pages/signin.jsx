import Heading from "../components/heading"
import Inputbox from "../components/inputbox"
import Button from "../components/button"
import Subheading from "../components/subheading"
import Bottomwarning from "../components/bottomwarning"

export default function Signin(){
    return<div className=" flex flex-col justify-center h-screen w-full bg-gradient-radial from-zinc-600 to-zinc-800">
     <div className="flex justify-center ">
     <div className=" bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-zinc-800 via-black to-zinc-800 rounded-lg shadow-xl shadow-black px-10 pt-2 pb-4">
        <Heading label={"Sign in"}/>
        <Subheading label ="Enter your information to sign into your account"/>
       
        <Inputbox label={"Username"} placeholder={"JohnWick69@gmail.com"}></Inputbox>
        <Inputbox label={"Password"} placeholder={"12345"}></Inputbox>
        <div className="p-2"></div>
        <Button label = "Sign up"></Button>
        <Bottomwarning label ={"Don't have an account?"} buttontext={"Sign up"} to={"/signup"}></Bottomwarning>

    </div>
    </div>
    </div>
}