// Importamos Routes y Route de react-router-dom
import { Route, Routes } from 'react-router-dom'
import './index.css'
import About from './pages/About'
//import Contact from './pages/Contact'
import Home from './pages/Home'
//import NotFound from './pages/NotFound'

export default function App() {
  return (
    // Definimos las Rutas con el componente Padre Routes
    <Routes>
      
      <Route index element={<Home />} />
     
      <Route path="about" element={<About />} />
 
   
    </Routes>
  )
}