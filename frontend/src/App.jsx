import { Routes, Route } from 'react-router-dom'
import HomePage from './page/homePage/HomePage'
import MainLayout from './layout/mainLayout'
function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
