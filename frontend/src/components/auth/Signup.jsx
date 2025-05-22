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
import { setLoading } from '../../redux/authSlice'
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react'
import Footer from '../shared/Footer'


const Signup = () => {

    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        profilePhoto: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, profilePhoto: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('confirmPassword', input.confirmPassword);
        formData.append('role', input.role);
        if (input.profilePhoto) {
            formData.append('profilePhoto', input.profilePhoto);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            console.log(res);

            if (res.data.success) {
                navigate("/login")
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    submitHandler(e);
                                }
                            }}
                            className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2 border border-purple-300 rounded shadow-md shadow-purple-900 p-4 my-10'
                        >
                            <h1 className='font-bold text-xl sm:text-2xl text-center underline text-purple-900 mb-5 flex items-center justify-center gap-2'>
                                <UserPlus/><span>Register Form</span>
                            </h1>
                            <div className='my-2'>
                                <Label className='text-purple-800'>Full Name<span className='text-red-500'>*</span></Label>
                                <Input
                                    type="text"
                                    value={input.fullName}
                                    name="fullName"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className='mt-1 w-full'
                                />
                            </div>
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
                                <Label className='text-purple-800'>Phone Number<span className='text-red-500'>*</span></Label>
                                <Input
                                    type="tel"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
                                    className='mt-1 w-full'
                                />
                            </div>
                            <div className='my-2'>
                                <Label className='text-purple-800'>Password<span className='text-red-500'>*</span></Label>
                                    <Input
                                        type='password'
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className='w-full mt-1'
                                    />
                            </div>
                            <div className='my-2'>
                                <Label className='text-purple-800'>Confirm Password<span className='text-red-500'>*</span></Label>
                                <div className='flex items-center mt-1'>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={input.confirmPassword}
                                        name="confirmPassword"
                                        onChange={changeEventHandler}
                                        placeholder="Retype your password"
                                        className='w-full'
                                    />
                                    <span onClick={togglePassword} className='-ml-[30px] text-purple-900 cursor-pointer'>
                                        {showPassword ? <EyeOff className='w-5'/> : <Eye className='w-5'/>}
                                    </span>
                                </div>
                            </div>
                            <div className='mt-4 mb-3 flex flex-col md:flex-row gap-2 justify-between items-start'>
                                <RadioGroup className='flex flex-col gap-3 w-full md:w-1/2'>
                                    <Label className='text-purple-800'>Role<span className='text-red-500'>*</span></Label>
                                    <div className='flex flex-row items-center gap-4'>
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

                                <div className='w-full md:w-1/2 flex flex-col gap-2 mt-5 md:mt-0'>
                                    <Label className='text-purple-800'>Profile Picture <span className='text-sm text-gray-300'>(Optional)</span></Label>
                                    <Input
                                        accept='image/*'
                                        type='file'
                                        onChange={changeFileHandler}
                                        className='cursor-pointer'
                                    />
                                </div>
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
                                        Sign Up
                                    </Button>
                                )
                            }

                            <div className='flex flex-col sm:flex-row items-center justify-center gap-2'>
                                <p>Already have an account?</p>
                                <Link to="/login" className='text-purple-700 font-bold hover:text-purple-900 hover:underline'>
                                    Login
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

export default Signup
