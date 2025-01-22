import React, { useState } from 'react';
import('../App.css')
import "font-awesome/css/font-awesome.min.css";
import { User } from '../interface/user'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/states/userdata';
import axios, { AxiosError } from 'axios';
function Auth() {
    const statsdatass=useSelector(state=>state.Userdata)
    
    
    const dispatch=useDispatch()
const nav=useNavigate()

    const [pass, setPass] = useState<boolean>(false);
    const [isSignup, chLogin] = useState<boolean>(false)
    const [data, Setdata] = useState<User>({
        fullname: '',
        email: "",
        password: ""
    })
    const validateUser = (obj: User): boolean => {
        const errors: string[] = [];
    
    
        if(isSignup){
            if (obj.fullname.trim() === "") {
                errors.push("Please fill in your name.");
            }
        }
    
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (obj.email.trim() === "") {
            errors.push("Please fill in your email.");
        } else if (!emailRegex.test(obj.email)) {
            errors.push("Please enter a valid email address.");
        }
    
        
        if (obj.password.trim() === "") {
            errors.push("Please fill in your password.");
        }
    
        if (errors.length > 0) {
             toast.error(errors.join(", "))
             return true
        }
    
        return false;
    };
    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      if(!validateUser(data)){
        console.log(data);

       const url=isSignup?'http://localhost:4050/register':'http://localhost:4050/login'
       console.log(url);
       
        axios.post(url,data,{headers:{"Content-Type":'application/json'}})
        .then((res)=>{

            if(res.data.success){
                toast.success(res.data.message)
                if(!isSignup){
                    console.log("here");
                    
                    console.log(res.data);
                    localStorage.setItem('accs',res.data.accesToken)
                
                   
                    dispatch(setData({udata:res.data.udat,id:res.data.accesToken}))
                    console.log(statsdatass);
                    if(res.data.udat.role=="ADMIN"){
                        nav('/admin')
                        return 
                    }
                    nav('/')
                    return 
                }
                
                console.log("nohere");

            }
            else{
                toast.error(res.data.message)
            }
        })
        .catch((err:AxiosError)=>{
            console.log('error');
            console.log(err.message);
            
            toast.error(err.message)
        })
       
        
      }


    };
    const changeing = (e: React.InvalidEvent) => {
        const { name, value } = e.target as HTMLFormElement
        Setdata((prevs) => ({
            ...prevs, [name]: value.trim()
        }))

    }
    const togglePasswordVisibility = () => {
        setPass(!pass);
    };
    const handleAuth = () => {
        chLogin(prev => !prev)
    }

    return (
        <div className='flex w-[99wh] h-[95vh] items-center justify-center bg-gray-50'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>{isSignup?"Create Account":"Login"}</h2>

                <div>
                    <form onSubmit={handlesubmit} className='space-y-4 '>
                        {isSignup && (<div className='space-y-2'>
                            <label
                                htmlFor="fullname"
                                className='block text-sm font-medium text-gray-700'
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                onChange={changeing}
                                id="fullname"
                                name='fullname'
                                placeholder='Enter full name'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>)}

                        <div className='space-y-2'>
                            <label
                                htmlFor="email"
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                onChange={changeing}

                                id="email"
                                name="email"
                                placeholder='Enter your email'
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                                required
                            />
                        </div>

                        <div className='space-y-2'>
                            <label
                                htmlFor="password"
                                className='block text-sm font-medium text-gray-700'
                            >
                                Password
                            </label>
                            <div className='relative'>
                                <input
                                    type={pass ? 'text' : 'password'}
                                    onChange={changeing}

                                    id="password"
                                    name='password'
                                    placeholder='Enter password'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
                                    required
                                />
                                <i
                                    onClick={togglePasswordVisibility}
                                    className={`fa ${pass ? "fa-eye" : "fa-eye-slash"} absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700`}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            {isSignup?"Sign Up":'Login'}
                        </button>
                    </form>
                    {(<span>{!isSignup?`Don't`:'Already'} have account ? <a className='text-blue-700 cursor-pointer' onClick={handleAuth}>{!isSignup?'Sign in':'Login'}</a> </span>)}
                 

                </div>
            </div>
        </div>
    );
}

export default Auth;