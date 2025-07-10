import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Suburbs from './pages/Suburbs'
import PostCode from './pages/PostCode'

function App() {

  return (
    <>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/suburb' element={<Suburbs/>}/>
        <Route path='/postcode' element={<PostCode/>}/>
      </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
