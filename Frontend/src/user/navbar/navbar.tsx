
import {User} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { removestate } from '../../redux/states/userdata'
import { Home } from 'lucide-react'
function Navbar() {
  const dispatch=useDispatch()
    const [account,setaccount]=useState(false)
    const showon=()=>setaccount(true)
    const showhide=()=>setaccount(false)
    const navigate=useNavigate()
    const isLogin=localStorage.getItem('accs')
    
  return (
    
    <div className="flex justify-between py-2 bg-gray-300 px-8 w-full">
      <div className="leftside flex">
       
        <div onClick={()=>{
          navigate('/')
        }} className='flex w-[78px] justify-between items-center'>
            <Home size={25}/>home
        </div>
      </div>
      <div className="rightside relative w-30" >
      <User size={31} onMouseEnter={showon} />
      {account && account && (
        <ul className="absolute right-0 mt-2 bg-gray-600 border rounded-lg shadow-lg w-32   z-10" onMouseEnter={showon} onMouseLeave={showhide}>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={()=>navigate(isLogin?'/profile':'/auth')}>My account</li>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={()=>{
            localStorage.removeItem('accs')
            dispatch(removestate())
            navigate('/auth')
          }}>Logout</li>
        </ul>
      )}
    </div>
    </div>
  )
}

export default Navbar
