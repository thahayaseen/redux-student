import { useNavigate } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchdata } from "../../redux/states/userdata"

function Home() {
  const dispatch = useDispatch()
  const checkauth = localStorage.getItem('accs')
  const navigate = useNavigate()
  useEffect(() => {
    if (!checkauth) {
      navigate('/auth')
      return
    }
  }, [])
  const rstate = useSelector((state) => state.Userdata.userdata)
  console.log(JSON.stringify(rstate));
  if (!rstate.name || !rstate.email) {
    dispatch(fetchdata())
  }


  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-serif text-[50px] font-bold">Hello {rstate.name}.....</h1>
      </div>
    </>
  )
}

export default Home
