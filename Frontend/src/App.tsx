import { Routes, Route } from 'react-router-dom'

import React,{ Suspense } from 'react'
import Dashbord from './admin/dashbord'
const Profile=React.lazy(()=>import('./user/profile/Profile'))
const Home=React.lazy(()=>import( './user/home/Home'))
const Edituser =React.lazy(()=>import('../components/edituser'))

const Auth = React.lazy(()=>import('./auth/auth'))

function App() {

  return (
    <Suspense fallback={<h2>loading</h2>}>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Auth />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path='/admin' element={<Dashbord/>}/>
      <Route path='/edit/:id' element={<Edituser/>}/>
      
    </Routes>
  </Suspense>
  
  )
}

export default App
