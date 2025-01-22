import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchdata } from '../redux/states/userdata';
import { useNavigate } from 'react-router-dom';
// import Edituser from '../../components/edituser';
import axios from 'axios';
import Navbar from '../user/navbar/navbar';
interface inusers{
    id:number,
    name:string,
    email:string
  }
const Dashboard = () => {
  const userData = useSelector((state) => state.Userdata.userdata);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState<inusers[]>([]);
  const [loading, setLoading] = useState(false);
  const [duelete,setdelete]=useState(true)
  const [error, setError] = useState(null);
  const [searching, Setseartch] = useState("");

  const fetchUsers = async () => {
    try {
        setLoading(true)
      const token = localStorage.getItem('accs');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.get('http://localhost:4050/allusers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.data?.data) {
        throw new Error('Invalid response format');
      }

      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      // localStorage.removeItem('accs')
      navigate('/')
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem('accs');
      if (!token) {
        navigate('/auth');
        return;
      }

      if (!userData.name || !userData.email || !userData.role) {
         dispatch(fetchdata());
      }

      if (userData.role && userData.role !== 'ADMIN') {
        navigate('/');
        return;
      }

      fetchUsers();
    };

    checkAuthAndFetchData();
  }, [duelete]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  const handledelte=async(id:number)=>{
    console.log(id,"is");
    // setLoading(true)
    await axios.delete('http://localhost:4050/u/'+id)

    setUsers(users.filter((data:inusers)=>{
       return data.id!=id
    }))
    // setdelete(!duelete)
  }

  return (
   <>
    <Navbar/>
    <div className="p-6 max-w-6xl mx-auto">

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Admin Panel, {userData.name || 'Admin'}
          </h1>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded">
              {error}
            </div>
          )}
            <div className="search space-x-4">
                <label htmlFor="search">Search</label>
                <input type="search" onChange={(e)=>{
                    Setseartch(e.target.value)
                }} id='search' className='border border-black w-[13vw] h-[3vh] p-2 rounded-lg' placeholder='Search students'/>
            </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold text-gray-600 border-b">ID</th>
                  <th className="p-3 text-left font-semibold text-gray-600 border-b">Name</th>
                  <th className="p-3 text-left font-semibold text-gray-600 border-b">Email</th>
                  <th className="p-3 text-left font-semibold text-gray-600 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                 
  
                  
                users.filter((dat)=>{
                    return (
                        searching==""||dat.name.toLowerCase().startsWith(searching.toLowerCase())
                    )
                }).map((user, index) => (
                  <tr 
                    key={user.id || `user-${index}`}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-gray-600">{index + 1}</td>
                    <td className="p-3 text-gray-600">{user.name || 'N/A'}</td>
                    <td className="p-3 text-gray-600">{user.email || 'N/A'}</td>
                    <td className="p-3 space-x-2">
                      <button 
                        onClick={() => navigate('/edit/'+user.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      >
                        View Details
                      </button>
                      <button className='bg-red-800 px-4 py-2 rounded-lg' onClick={()=>{
                        console.log(user.id)
                        handledelte(user.id)
                      }}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
   
          </div>

          {users.length === 0 && !error && (
            <div className="text-center py-8 text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div></>
  );
};

export default Dashboard;