// import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const MainLayout = ()=> {
  return (
    <>
    <Navbar>
      <main className="p-5">
        <Outlet/>
      </main>
    </Navbar>
    </>
  )
}

export default MainLayout