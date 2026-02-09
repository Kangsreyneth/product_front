import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProductList from './components/views/ProductList'
import AddProduct from './components/views/AddProduct'
import EditProduct from './components/views/EditProduct'
import Dashboard from './components/views/Dashboard'
import Analytics from './components/views/Analytics'
import Categories from './components/views/Categories '
import Settings from './components/views/Settings'
import PublicProducts from './components/views/PublicProducts'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/edit/:id" element={<EditProduct/>} />
        <Route path="/" element={<Dashboard/>} />
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/shop' element={<PublicProducts/>}/>
        <Route path="*" element={<p className="text-center mt-10">Page Not Found</p>} />
      </Routes>
    </Router>
  )
}
export default App