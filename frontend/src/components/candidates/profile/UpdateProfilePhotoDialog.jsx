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

const UpdateProfilePhotoDialog = ({ open, setOpen }) => {
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitHandler(e);
        }
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent className="w-full sm:max-w-lg md:max-w-xl rounded-lg" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl font-semibold text-purple-900">
                        Update Profile Photo
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">
                        Make changes to your profile photo. Click 'Update' button when you're done.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={submitHandler}
                    onKeyDown={(e) => { if (e.key === 'Enter') { submitHandler(e); } }}
                    className="space-y-4 mt-5"
                >
                    <div className="flex flex-col gap-0">
                        <Label htmlFor="profilePhoto" className="font-medium text-sm sm:text-base">
                            Profile Photo:
                        </Label>
                        <div>
                            <Input
                                type="file"
                                accept="image/*"
                                id="profilePhoto"
                                name="profilePhoto"
                                onChange={handleFileChange}
                                className="w-full"
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                *Upload only .jpg/.jpeg/.png file*
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2 my-5">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto border-gray-400 order-last sm:order-first">
                                Cancel
                            </Button>
                        </DialogClose>

                        {loading ? (
                            <Button
                                className="w-full sm:w-auto bg-purple-800" disabled={loading}>
                                <Loader2 className="h-4 w-4 animate-spin" /> wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-purple-800 hover:bg-purple-900">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfilePhotoDialog;
