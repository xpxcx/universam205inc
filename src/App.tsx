import React from "react";
import './index.scss'
import { Home } from "./pages/Home";
import { Routes, Route } from "react-router";
import { Cart } from "./pages/Cart";
import { MainLayout } from "./layouts/MainLayout";
import { CartEmpty } from "./pages/Cart/CartEmpty";
function App() {

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<CartEmpty/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
