import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import { Button } from '../ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const ChangePassword = () => {

    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const [input, setInput] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.put(
                `${USER_API_END_POINT}/changePassword`,
                {
                    currentPassword: input.currentPassword,
                    newPassword: input.newPassword,
                    confirmNewPassword: input.confirmNewPassword,
                },
                { withCredentials: true }
            );

            if (res.data.success) {
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, []);

    return (
        <>
            <main className='flex flex-col min-h-screen dark:bg-zinc-900'>
                <nav>
                    <Navbar />
                </nav>

                <section className='flex-1'>
                    <div className='max-w-2xl md:mx-auto mx-2 bg-white dark:bg-gray-900 border border-purple-300 dark:border-purple-700 rounded-xl shadow-md shadow-purple-900/40 my-10 sm:p-8 px-5 py-3'>
                        <div>
                            <h1 className="text-purple-900 dark:text-purple-400 font-semibold text-center underline underline-offset-4 text-lg sm:text-xl">
                                Change Password
                            </h1>
                            <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300 text-center mt-1">
                                Enter your current password and new password to change your password.
                            </p>
                        </div>

                        <form onSubmit={submitHandler} className="pt-5">
                            <div className="flex flex-col items-start gap-1">
                                <Label htmlFor="currentPassword" className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-200">
                                    Current Password<span className='text-red-600'>*</span>
                                </Label>
                                <Input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    onChange={handleInput}
                                    className="w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                                    placeholder="Enter your current password"
                                />
                            </div>

                            <div className="flex flex-col items-start gap-1 my-4">
                                <Label htmlFor="newPassword" className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-200">
                                    New Password<span className='text-red-600'>*</span>
                                </Label>
                                <Input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    onChange={handleInput}
                                    className="w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                                    placeholder="Enter your new password"
                                />
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                <Label htmlFor="confirmNewPassword" className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-200">
                                    Confirm New Password<span className='text-red-600'>*</span>
                                </Label>
                                <div className="flex items-center w-full">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        id="confirmNewPassword"
                                        name="confirmNewPassword"
                                        onChange={handleInput}
                                        className="w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                                        placeholder="Confirm your new password"
                                    />
                                    <span
                                        className="-ml-7 cursor-pointer text-purple-800 dark:text-white"
                                        onClick={toggleShowPassword}
                                    >
                                        {showPassword ? <EyeOff className="w-5" /> : <Eye className="w-5" />}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center sm:justify-end gap-2 mt-8">
                                <Button type="button" onClick={() => navigate(-1)} variant="outline" className="w-full sm:w-1/6 border-gray-400 dark:border-zinc-600 dark:text-gray-200">
                                    Cancel
                                </Button>
                                <Button type="submit" className="w-full bg-purple-800 hover:bg-purple-900 sm:w-1/6 dark:text-white" disabled={loading}>
                                    {loading ? (
                                        <span className="flex gap-2 items-center">
                                            <Loader2 className="animate-spin" />
                                            Wait..
                                        </span>
                                    ) : (
                                        'Update'
                                    )}
                                </Button>
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

export default ChangePassword;
