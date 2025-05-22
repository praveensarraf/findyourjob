import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Avatar, AvatarImage } from '../../ui/avatar'
import commonCompanyLogo from '../../../assets/common-companyLogo.png'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Edit2, Loader2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../../utils/constant'
import { toast } from 'sonner'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { setCompanies } from '../../../redux/companySlice'

const CompaniesTable = () => {

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }

            const filterText = company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase()) || company?.location?.toLowerCase().includes(searchCompanyByText.toLowerCase());
            return filterText;
        });

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const deleteCompanyHandler = async (companyId) => {
        try {
            setLoading(true);
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, { withCredentials: true });

            if (res.data.success) {
                const updatedCompanies = companies.filter(company => company._id !== companyId);
                dispatch(setCompanies(updatedCompanies));
                setDialogOpen(false);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Failed to delete company!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='overflow-x-auto appliedJobsTableScrollbar'>
                <Table>
                    <TableCaption className='pb-5 md:pb-2'>A list of your registered Companies</TableCaption>
                    <TableHeader>
                        <TableRow className='hover:bg-transparent'>
                            <TableHead>Logo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Registered Date</TableHead>
                            <TableHead className='text-right'>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            filterCompany?.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company?.logo ? company?.logo : commonCompanyLogo} alt={`Logo of ${company?.name.split(' ')[0]}`} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className='font-semibold'>{company?.name}</TableCell>
                                    <TableCell>{company?.location}</TableCell>
                                    <TableCell>{new Date(company?.createdAt).toLocaleDateString('en-IN')}</TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className='cursor-pointer' />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-fit p-0'>
                                                <div className='flex flex-col justify-center p-1'>
                                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex gap-2 items-center justify-center w-full cursor-pointer py-1 px-4 hover:bg-gray-100 rounded'>
                                                        <Edit2 className='w-4' />
                                                        <span className='text-base'>Edit</span>
                                                    </div>

                                                    <div className=' h-[1px] bg-gray-400 my-1'></div>

                                                    <div>
                                                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                                            <DialogTrigger asChild>
                                                                <div className='flex gap-2 items-center justify-center w-full cursor-pointer text-red-600 py-1 px-4 hover:bg-gray-100 rounded'>
                                                                    <Trash2 className='w-4' />
                                                                    <span className='text-base'>Delete</span>
                                                                </div>
                                                            </DialogTrigger>

                                                            <DialogContent className="md:max-w-xl rounded-lg" onInteractOutside={(e) => e.preventDefault()} aria-describedby=''>
                                                                <DialogHeader>
                                                                    <DialogTitle className='text-center text-xl text-red-700 font-bold mx-5'>Delete - {company?.name}</DialogTitle>
                                                                </DialogHeader>

                                                                <h1 className='text-lg font-medium text-center my-3'>Are you sure you want to delete this company?</h1>

                                                                <DialogFooter>
                                                                    <div className="flex flex-col md:flex-row items-center md:justify-end gap-2 w-full">
                                                                        <DialogClose asChild>
                                                                            <Button type='button' variant='outline' className='border-gray-400 w-full md:w-1/6 order-last md:order-first'>Cancel</Button>
                                                                        </DialogClose>

                                                                        <Button onClick={() => deleteCompanyHandler(company._id)} className='bg-red-600 hover:bg-red-700 w-full md:w-1/6' disabled={loading}>
                                                                            {loading ? (
                                                                                <div className='flex items-center justify-center gap-1'>
                                                                                    <span className='w-4 h-4 animate-spin'><Loader2 /></span>
                                                                                    <span>Wait</span>
                                                                                </div>
                                                                            ) : 'Delete'}
                                                                        </Button>
                                                                    </div>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default CompaniesTable
