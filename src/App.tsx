import './index.scss'
import { Home } from "./pages/Home/index.tsx";
import { Routes, Route } from "react-router";
import { MainLayout } from "./layouts/MainLayouts/index.tsx";
import { Cart } from "./pages/Cart/index.tsx";
import { Favorite } from './pages/Favorite/index.tsx';
import { User } from './components/User/index.tsx'
import { Authorization } from './components/Authorization/index.tsx';
import { Registration } from './components/Registration/index.tsx';
import { Profile } from './pages/Profile/index.tsx';
import { Admin } from './pages/Admin/index.tsx';
import { MyOrders } from './pages/MyOrders';



import { NotFound } from './components/NotFound/index.tsx'
import { AddProduct } from './components/AddProduct/index.tsx'; 
import { EditProduct } from './components/EditProduct/index.tsx';
import { AdminEditColumnProduct } from './components/AdminEditColumnProduct/index.tsx';
function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path='/' element={<Home/>}/> 
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/favorite' element={<Favorite/>}/>
          <Route path='/authorization' element={<Authorization key='auth'/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/user' element={<User/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/adminAddProduct' element={<AddProduct/>}/>
          <Route path='/adminEditProduct' element={<EditProduct/>}/>
          <Route path='/editColumn' element={<AdminEditColumnProduct id={0} title={''} price={0} imageUrl={''} category={''} size={0} unit={''} type={''} inStock={0}/>}/>
          <Route path='/my-orders' element={<MyOrders/>}/>
          <Route path='*' element={<NotFound/>}></Route>

          </Route>
      </Routes>
    </div>
  )
}

export default App
