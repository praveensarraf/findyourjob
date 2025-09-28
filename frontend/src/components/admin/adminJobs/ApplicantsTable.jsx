import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Popover, PopoverTrigger, PopoverContent } from '../../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../../utils/constant';
import { toast } from 'sonner';
import { setStatus } from '../../../redux/applicationSlice';
import { Badge } from '../../ui/badge';

const ApplicantsTable = () => {
    const { applicants } = useSelector(state => state.application);
    const shortListingStatus = ["Accepted", "Pending", "Rejected"];
    const dispatch = useDispatch();
    const [openPopover, setOpenPopover] = useState(null);

    const statusHandler = async (id, status) => {
        try {
            const res = await axios.put(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status },
                { withCredentials: true }
            );

            if (res.data.success) {
                dispatch(setStatus({ id, status }));
                toast.success(res.data.message);
                setOpenPopover(null);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update status!");
        }
    };

    return (
        <div className='overflow-x-auto appliedJobsTableScrollbar'>
            <Table className='bg-white text-gray-900 border border-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700'>
                <TableCaption className='pb-5 md:pb-3 dark:text-gray-400'>
                    A list of applicants who applied for your posted job
                </TableCaption>
                <TableHeader>
                    <TableRow className='hover:bg-transparent'>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead className='text-center'>Status</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {applicants?.applications?.map(item => (
                        <TableRow key={item._id} className='font-medium hover:dark:bg-zinc-900'>
                            <TableCell>{item?.applicant?.fullName}</TableCell>
                            <TableCell>
                                <a
                                    href={`mailto:${item?.applicant?.email}`}
                                    target='_blank'
                                    className='hover:underline dark:text-purple-400'
                                >
                                    {item?.applicant?.email}
                                </a>
                            </TableCell>
                            <TableCell>
                                <a
                                    href={`tel:+91${item?.applicant?.phoneNumber}`}
                                    target='_blank'
                                    className='hover:underline dark:text-purple-400'
                                >
                                    +91 <span>{item?.applicant?.phoneNumber}</span>
                                </a>
                            </TableCell>
                            <TableCell>
                                <a
                                    href={item?.applicant?.profile?.resume}
                                    target='_blank'
                                    rel='noreferrer'
                                    className={`${
                                        item?.applicant?.profile?.resume
                                            ? 'text-purple-800 hover:underline underline-offset-2 font-semibold dark:text-purple-500'
                                            : 'font-normal dark:text-gray-400'
                                    }`}
                                >
                                    {item?.applicant?.profile?.resume ? 'View Resume' : 'Not Available'}
                                </a>
                            </TableCell>
                            <TableCell className='font-normal dark:text-gray-300'>
                                {new Date(item?.applicant?.updatedAt).toLocaleDateString('en-IN')}
                            </TableCell>
                            <TableCell>
                                <Badge
                                    className={`w-full flex justify-center ${
                                        item.status.toLowerCase() === 'rejected'
                                            ? 'bg-red-500 hover:bg-red-500 dark:bg-red-700 dark:text-white'
                                            : item.status.toLowerCase() === 'pending'
                                            ? 'bg-gray-500 hover:bg-gray-500 dark:bg-gray-600 dark:text-white'
                                            : 'bg-green-500 hover:bg-green-500 dark:bg-green-700 dark:text-white'
                                    }`}
                                >
                                    {item?.status.toUpperCase()}
                                </Badge>
                            </TableCell>
                            <TableCell className='text-right'>
                                <Popover open={openPopover === item._id} onOpenChange={(isOpen) => setOpenPopover(isOpen ? item._id : null)}>
                                    <PopoverTrigger>
                                        <MoreHorizontal className='cursor-pointer dark:text-gray-100' />
                                    </PopoverTrigger>

                                    <PopoverContent className='w-32 flex flex-col p-1 mr-3 border border-purple-900 dark:border-gray-200'>
                                        {shortListingStatus.map((status, index) => (
                                            <div
                                                key={index}
                                                onClick={() => statusHandler(item._id, status)}
                                                className='hover:bg-gray-200 dark:hover:bg-gray-700 rounded py-2 px-3 text-center cursor-pointer'
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
