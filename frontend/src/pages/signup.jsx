import Heading from "../components/heading"
import Inputbox from "../components/inputbox"
import Button from "../components/button"
import Subheading from "../components/subheading"
import Bottomwarning from "../components/bottomwarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const [Firstname, setFirstname] = useState("");
    const [Lastname, setLastname] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const redirector = async () => {
        console.log("here")
        const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
            Username, Password, Firstname, Lastname
        }
        )
        localStorage.setItem("token", res.data.token)
        if (res.data.token) navigate("/dashboard");
    }
    return <div className="flex flex-col justify-center h-screen w-full bg-gradient-radial from-zinc-600 to-zinc-800">
        <div className="flex justify-center ">
            <div className=" bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-zinc-800 from-5% via-black via-55% to-zinc-800 rounded-lg shadow-xl shadow-black px-10 pt-2 pb-4">
                <Heading label={"Sign up"} />
                <Subheading label="Enter your information to create an account" />
                <Inputbox onchange={e => { setFirstname(e.target.value) }} label={"Firstname"} placeholder={"Anand"}></Inputbox>
                <Inputbox onchange={e => setLastname(e.target.value)} label={"Lastname"} placeholder={"Yadav"}></Inputbox>
                <Inputbox onchange={e => setUsername(e.target.value)} label={"Username"} placeholder={"yadayada@g.com"}></Inputbox>
                <Inputbox onchange={e => setPassword(e.target.value)} label={"Password"} placeholder={"StrongPassword"}></Inputbox>
                <div className="p-2"></div>
                <Button onClick={redirector} label="Sign up"></Button>
                <Bottomwarning label={"Already have an account?"} buttontext={"Sign in"} to={"/signin"}></Bottomwarning>

            </div>
        </div>
    </div>
}