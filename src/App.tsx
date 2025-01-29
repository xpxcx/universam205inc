import './index.scss'
import { Home } from "./pages/Home/index.tsx";
import { Routes, Route } from "react-router";
import { MainLayout } from "./layouts/MainLayouts/index.tsx";
import { Cart } from "./pages/Cart/index.tsx";
import { Favorite } from './pages/Favorite/index.tsx';
import { Profile } from './pages/User/index.tsx'
import { Authorization } from './pages/Authorization/index.tsx';
import { Registration } from './pages/Registration/index.tsx';
function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/favorite' element={<Favorite/>}/>
          <Route path='/profile' element={<Authorization/>}/>
          <Route path='/registration' element={<Registration/>}/>


        </Route>
      </Routes>
    </div>
  )
}

export default App
