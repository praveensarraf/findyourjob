import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { TriangleAlert } from 'lucide-react';
import DeleteAccountDialog from './DeleteAccountDialog';

const DeleteAccountConfirmation = ({ open, setOpen }) => {

    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

    const handleDeleteAccountOpen = () => {
        setOpen(false);
        setIsDeleteAccountOpen(true);
    }

    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent className="w-full sm:max-w-lg md:max-w-xl rounded-lg" onInteractOutside={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl text-center font-semibold text-red-600">
                            <div className='flex items-center justify-center gap-2'>
                                <TriangleAlert /><span>WARNING!!</span>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm text-center">
                            Delete your account permanently.
                        </DialogDescription>

                        <div className='text-center py-10'>
                            <h1 className='text-red-600 sm:text-lg text-base'>Are you sure you want to delete your account?</h1>
                            <p className='sm:text-sm text-xs mt-2'>NOTE: Deleting your account will remove all your data.</p>
                            <p className='sm:text-sm text-xs'>This action cannot be undone.</p>
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

                            <Button
                                onClick={handleDeleteAccountOpen}
                                type="submit"
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* Another Dialog will Open for Account password to confirm deletion */}
            <DeleteAccountDialog open={isDeleteAccountOpen} setOpen={setIsDeleteAccountOpen} />
        </>
    );
};

export default DeleteAccountConfirmation;
