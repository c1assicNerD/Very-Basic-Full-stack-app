import Appbar from "../components/appbar";
import Balance from "../components/balance";
import User from "../components/user";

export default function Dashboard(){
    return <div className=" min-h-screen min-w-fit w-full bg-gradient-radial from-zinc-600 to-zinc-800 " >
            <Appbar></Appbar>
            <Balance/>
            <User/>

    </div>
}