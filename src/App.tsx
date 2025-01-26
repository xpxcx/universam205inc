import './index.scss'
import { Home } from "./pages/Home/index.tsx";
import { Routes, Route } from "react-router";
import { MainLayout } from "./layouts/MainLayouts/index.tsx";
import { Cart } from "./pages/Cart/index.tsx";
import { CartEmpty } from "./pages/Cart/CartEmpty";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
