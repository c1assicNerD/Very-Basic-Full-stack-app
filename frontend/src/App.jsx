import React from "react"
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Dashboard from "./pages/dashboard"
import Send from "./pages/send"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import Heading from "./components/heading"
import Transaction from "./pages/transaction"
function App() {

  return (
    <>
      <BrowserRouter>
      
      <Routes>
      
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/Dashboard" element={<Dashboard/>}></Route>
        <Route path="/send" element={<Send/>}></Route>
        <Route path="/transaction" element={<Transaction/>}></Route>
        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
