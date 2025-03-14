import { BrowserRouter, Route, Routes } from 'react-router'
import Details from './pages/Details'
import Home from './pages/Home'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' index element={<Home/>} />
        <Route path="/:id" element={<Details />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
