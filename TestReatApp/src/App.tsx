
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ShapePage from './Pages/ShapePage'
import FormPage from './Pages/FormPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/shape' element={<ShapePage/>}/>
          <Route path='/form/:idPage' element={<FormPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
