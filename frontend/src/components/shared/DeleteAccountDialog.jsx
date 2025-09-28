import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { USER_API_END_POINT } from '../../utils/constant';
import { Eye, EyeOff, Loader2, TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/redux/authSlice';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const DeleteAccountDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const togglePassword = () => setShowPassword(!showPassword);

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        if (!password) {
            toast.error('Please enter your password.');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.delete(`${USER_API_END_POINT}/delete`, {
                data: { password },
                withCredentials: true,
            });
            if (res.data.success) {
                setOpen(false);
                dispatch(setUser(null));
                toast.success(res.data.message);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Failed to delete account!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent
                className="w-full sm:max-w-lg md:max-w-xl rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl text-center font-semibold text-red-600">
                        <div className="flex items-center justify-center gap-2">
                            <TriangleAlert />
                            <span>WARNING</span>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300">
                        Delete your account permanently
                    </DialogDescription>

                    <div className="text-center pt-2">
                        <h1 className="text-purple-800 dark:text-purple-300 sm:text-lg text-base">
                            Are you sure you want to delete your account?
                        </h1>
                    </div>

                    <form onSubmit={handleDeleteAccount}>
                        <p className="text-xs sm:text-sm text-center text-gray-700 dark:text-gray-300">
                            Please enter your password to confirm deletion.
                        </p>

                        <div className="flex flex-col items-start gap-1 sm:gap-2 my-5">
                            <Label htmlFor="password" className="font-medium text-sm sm:text-base">
                                Password<span className='text-red-600'>*</span>
                            </Label>
                            <div className="flex items-center w-full">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full focus-visible:ring-red-600 focus-visible:dark:ring-red-400 bg-white dark:bg-zinc-700 text-gray-900 dark:text-gray-100"
                                    placeholder="Enter your password"
                                />
                                <span onClick={togglePassword} className="-ml-[30px] text-red-600 dark:text-red-400 cursor-pointer">
                                    {showPassword ? <EyeOff className="w-5" /> : <Eye className="w-5" />}
                                </span>
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 my-5">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full sm:w-1/2 md:w-fit border-gray-400 dark:border-zinc-600 dark:text-gray-200 order-last sm:order-first"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            {loading ? (
                                <Button className="w-full sm:w-1/2 md:w-fit bg-red-600" disabled={loading}>
                                    <Loader2 className="h-4 w-4 animate-spin" /> wait
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleDeleteAccount}
                                    type="submit"
                                    className="w-full sm:w-1/2 md:w-fit bg-red-600 hover:bg-red-700 dark:text-white"
                                >
                                    Delete
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccountDialog;
