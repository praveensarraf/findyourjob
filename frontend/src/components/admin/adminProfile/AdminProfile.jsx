import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import commonProfilePhoto from '../../../assets/common-profilePhoto.png';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { useSelector } from 'react-redux';
import AdminProfilePhotoEditDialog from './AdminProfilePhotoEditDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { Button } from '../../ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { useNavigate } from 'react-router';

const AdminProfile = () => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);

    return (
        <main className='flex flex-col min-h-screen'>
            <nav><Navbar /></nav>

            <section className='flex-1'>
                <div className='max-w-4xl md:mx-auto mx-2 bg-white dark:bg-zinc-950 border border-purple-300 dark:border-gray-700 rounded-2xl my-5 md:p-8 p-4 text-gray-900 dark:text-gray-100 shadow-md dark:shadow-purple-400'>
                    <div className='flex flex-col sm:flex-row sm:justify-between'>
                        <div className='flex flex-col sm:flex-row items-center gap-5 sm:order-first order-2'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Avatar
                                                className='w-24 h-24 cursor-pointer'
                                                onClick={() => setIsPhotoDialogOpen(true)}
                                            >
                                                <AvatarImage
                                                    src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto}
                                                    alt={`${user?.fullName}'s Photo`}
                                                />
                                            </Avatar>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className='bg-purple-900 text-purple-200 border-purple-400'>
                                        <p>Edit Profile Photo</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <div className='text-center sm:text-left'>
                                <h1 className='text-2xl font-semibold text-purple-900 dark:text-purple-500'>{user?.fullName}</h1>
                                <p className='text-gray-600 dark:text-gray-400'>{user?.profile?.bio}</p>
                            </div>
                        </div>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className='self-end sm:self-auto'>
                                        <Button
                                            onClick={() => navigate('/admin/profile/edit')}
                                            className='mt-4 sm:mt-0 bg-purple-100 dark:bg-gray-800 hover:dark:bg-gray-700 text-purple-900 dark:text-purple-200 rounded-full sm:rounded-md hover:bg-purple-200 flex items-center justify-center gap-1 sm:px-4 p-3'
                                        >
                                            <span><Pen /></span>
                                            <span className='hidden sm:block'>Edit</span>
                                        </Button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className='bg-purple-900 text-purple-200 border-purple-400'>
                                    <p>Edit Profile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className='my-5 flex flex-col gap-4'>
                        <div className='flex items-center gap-3'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>

                        <div className='flex items-center gap-3'>
                            <Contact />
                            <span>+91 {user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='mt-14 mb-5 flex flex-col sm:flex-row items-center justify-between gap-5'>
                        <Button
                            onClick={() => navigate('/admin/profile/edit')}
                            className='bg-purple-800 dark:bg-purple-900 hover:bg-purple-900 dark:hover:bg-purple-950 w-full sm:w-fit sm:hidden flex items-center gap-1'
                        >
                            <Pen /><span>Edit Profile</span>
                        </Button>
                    </div>
                </div>

                {/* Dialogs */}
                <AdminProfilePhotoEditDialog open={isPhotoDialogOpen} setOpen={setIsPhotoDialogOpen} />
            </section>

            <footer><Footer /></footer>
        </main>
    );
};

export default AdminProfile;
