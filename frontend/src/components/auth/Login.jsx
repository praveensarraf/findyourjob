import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { RadioGroup } from "../ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice'
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import Footer from '../shared/Footer'


const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if(!input.email){
            toast.error("Email is required!");
        }
        if(!input.password){
            toast.error("Password is required!");
        }
        if(!input.role){
            toast.error("Role is required!");
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/")
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again!");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, []);

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <>
            <main className='flex flex-col min-h-screen'>
                <nav>
                    <Navbar />
                </nav>

                <section className='flex-1'>
                    <div className='flex items-center justify-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
                        <form
                            onSubmit={submitHandler}
                            onKeyDown={(e) => { if (e.key === 'Enter') { submitHandler(e); } }}
                            className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border border-purple-300 rounded shadow-md shadow-purple-900 p-4 sm:p-6 lg:p-8 my-10'
                        >
                            <h1 className='font-bold text-xl sm:text-2xl text-center underline text-purple-900 mb-5 flex items-center justify-center gap-2'><LogIn/><span>Login</span></h1>

                            <div className='my-2'>
                                <Label className='text-purple-800'>Email<span className='text-red-500'>*</span></Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email"
                                    className='mt-1 w-full'
                                />
                            </div>

                            <div className='my-2'>
                                <Label className='text-purple-800'>Password<span className='text-red-500'>*</span></Label>
                                <div className='flex items-center mt-1'>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className='w-full'
                                    />
                                    <span onClick={togglePassword} className='-ml-[30px] text-purple-900 cursor-pointer'>{showPassword ? <EyeOff className='w-5'/> : <Eye className='w-5'/>}</span>
                                </div>
                            </div>

                            <div className='mt-4 mb-2 flex flex-col sm:flex-row justify-start sm:items-center'>
                                <RadioGroup className='flex flex-col gap-3'>
                                    <Label className='text-purple-800'>Role<span className='text-red-500'>*</span></Label>
                                    <div className='flex items-center gap-4'>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="jobSeeker"
                                                checked={input.role === 'jobSeeker'}
                                                onChange={changeEventHandler}
                                                id="jobSeeker"
                                                className='cursor-pointer checked:accent-purple-800'
                                            />
                                            <Label htmlFor="jobSeeker" className='cursor-pointer'>Job-Seeker</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="recruiter"
                                                checked={input.role === 'recruiter'}
                                                onChange={changeEventHandler}
                                                id="recruiter"
                                                className='cursor-pointer checked:accent-purple-800'
                                            />
                                            <Label htmlFor="recruiter" className='cursor-pointer'>Job-Recruiter</Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            {
                                loading ? (
                                    <Button
                                        type='button'
                                        className='w-full my-4 bg-purple-800'
                                        disabled={loading}
                                    >
                                        <Loader2 className='h-4 w-4 animate-spin' />
                                        Please wait
                                    </Button>
                                ) : (
                                    <Button
                                        type='submit'
                                        className='w-full my-4 bg-purple-800 hover:bg-purple-900'
                                    >
                                        Login
                                    </Button>
                                )
                            }

                            <div className='flex flex-col sm:flex-row justify-center items-center sm:gap-2'>
                                <p>Don't have an account?</p>
                                <Link
                                    to="/signup"
                                    className='text-purple-700 font-bold hover:text-purple-900 hover:underline'
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>

                <footer>
                    <Footer />
                </footer>
            </main>
        </>
    )
}

export default Login
