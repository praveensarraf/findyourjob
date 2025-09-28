import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { USER_API_END_POINT } from '../../../utils/constant';
import { setUser } from '@/redux/authSlice';
import { Label } from '../../ui/label';
import { Loader2 } from 'lucide-react';

const AdminProfilePhotoEditDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);

    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        setPhoto(selectedFile);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!photo) {
            toast.error('Please select a photo');
            return;
        }

        const formData = new FormData();
        formData.append('profilePhoto', photo);

        try {
            setLoading(true);
            const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Failed to update profile photo!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent
                className="md:max-w-xl rounded-lg bg-white dark:bg-zinc-950 dark:border-white text-gray-900 dark:text-gray-100"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className='sm:text-lg text-base'>Update Profile Photo</DialogTitle>
                    <DialogDescription className='sm:text-sm text-xs text-gray-600 dark:text-gray-400'>
                        Make changes to your profile photo. Click 'Update' button when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submitHandler} onKeyDown={(e) => { if (e.key === 'Enter') submitHandler(e); }}>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor='profilePhoto' className='font-medium sm:text-base text-sm'>Profile Photo :</Label>
                        <div>
                            <Input
                                type='file'
                                accept='image/*'
                                id='profilePhoto'
                                name='profilePhoto'
                                onChange={handleFileChange}
                                className='bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100'
                            />
                            <p className="text-xs text-gray-400 dark:text-gray-400 pl-2 mt-1">
                                *Upload only .jpg/.jpeg/.png file*
                            </p>
                        </div>

                        <DialogFooter>
                            <div className='flex flex-col sm:flex-row md:justify-end gap-2 my-5 w-full'>
                                <DialogClose asChild>
                                    <Button
                                        type='button'
                                        variant='outline'
                                        className='border-gray-400 dark:border-gray-600 w-full sm:w-1/2 md:w-1/3 lg:w-1/6 order-last sm:order-first'
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                {loading ? (
                                    <Button className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6 bg-purple-800 dark:bg-purple-900 dark:text-white' disabled>
                                        <Loader2 className='h-4 w-4 animate-spin' /> wait
                                    </Button>
                                ) : (
                                    <Button
                                        type='submit'
                                        className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6 bg-purple-800 dark:bg-purple-900 dark:text-white hover:bg-purple-900 dark:hover:bg-purple-950'
                                    >
                                        Update
                                    </Button>
                                )}
                            </div>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AdminProfilePhotoEditDialog;
