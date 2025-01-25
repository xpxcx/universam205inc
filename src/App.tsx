import React from "react";
import './index.scss'
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
function App() {

  return (
    <div className="wrapper">
      <Header/>
      <Home/>
    </div>
  )
}

export default App
