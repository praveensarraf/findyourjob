import React, { useEffect, useState } from 'react'
import Navbar from '../../shared/Navbar'
import Footer from '../../shared/Footer'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { Textarea } from "../../ui/textarea"
import { Button } from '../../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../../../utils/constant';
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner';
import { useNavigate } from 'react-router'

const ProfileEdit = () => {

    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.map(skill => skill) || '',
        resume: user?.profile?.resume || '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const resume = e.target.files?.[0];
        setInput({ ...input, resume });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('fullName', input.fullName);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);
        if (input.resume) {
            formData.append("resume", input.resume);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate('/profile');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Failed to update profile!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else if (user.role === 'recruiter') {
            navigate('/admin/companies');
        }
    }, [user, navigate]);

    return (
        <>
            <main className='flex flex-col min-h-screen'>
                <nav>
                    <Navbar />
                </nav>

                <section className='flex-1'>
                    <div className='max-w-4xl md:mx-auto mx-2 bg-white border border-purple-300 rounded-xl my-5 sm:p-8 px-5 py-3'>
                        <div>
                            <h1 className="text-purple-900 font-semibold text-center underline underline-offset-4 text-lg sm:text-xl">
                                Update Profile
                            </h1>
                            <p className="text-xs sm:text-sm text-muted-foreground text-center mt-1">
                                Make changes to your profile here. Click 'Update' button when you're done.
                            </p>
                        </div>

                        <form onSubmit={submitHandler} onKeyDown={(e) => { if (e.key === 'Enter') { submitHandler(e); } }} className="my-8">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-0 sm:gap-4">
                                    <Label htmlFor="fullName" className="font-medium text-sm sm:text-base">Full Name:</Label>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={input.fullName}
                                        onChange={changeEventHandler}
                                        className="col-span-3 w-full"
                                        placeholder="Enter your Full Name"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-0 sm:gap-4">
                                    <Label htmlFor="email" className="font-medium text-sm sm:text-base">Email:</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="col-span-3 w-full"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-0 sm:gap-4">
                                    <Label htmlFor="phoneNumber" className="font-medium text-sm sm:text-base">Phone Number:</Label>
                                    <Input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="col-span-3 w-full"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-0 sm:gap-4">
                                    <Label htmlFor="bio" className="font-medium text-sm sm:text-base">Bio:</Label>
                                    <Textarea
                                        id="bio"
                                        rows="4"
                                        name="bio"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        className="col-span-3 w-full focus-visible:ring-purple-900"
                                        placeholder="Description about yourself"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-0 sm:gap-4">
                                    <Label htmlFor="skills" className="font-medium text-sm sm:text-base">Skills:</Label>
                                    <div className="col-span-3">
                                        <Input
                                            type="text"
                                            id="skills"
                                            name="skills"
                                            value={input.skills}
                                            onChange={changeEventHandler}
                                            className="w-full"
                                            placeholder="Enter your skills"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            *Update your skills separated with commas (e.g. - Javascript, Java)*
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-0 sm:gap-4">
                                    <Label htmlFor="resume" className="font-medium text-sm sm:text-base">Resume:</Label>
                                    <div className="col-span-3">
                                        <Input
                                            type="file"
                                            accept="application/pdf"
                                            id="resume"
                                            name="resume"
                                            onChange={fileChangeHandler}
                                            className="w-full"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            *Upload only .pdf file*
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center sm:justify-end gap-2 mt-8">
                                <Button type="button" onClick={() => navigate(-1)} variant="outline" className="w-full sm:w-1/6 border-gray-400">
                                    Cancel
                                </Button>

                                {loading ? (
                                    <Button className="w-full sm:w-1/6 bg-purple-800" disabled={loading}>
                                        <Loader2 className="h-4 w-4 animate-spin" /> wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full sm:w-1/6 bg-purple-800 hover:bg-purple-900">
                                        Update
                                    </Button>
                                )}
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

export default ProfileEdit
