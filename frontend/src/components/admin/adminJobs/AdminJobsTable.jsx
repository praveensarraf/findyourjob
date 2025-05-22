import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Edit2, Eye, Loader2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../../utils/constant'
import { toast } from 'sonner'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog'
import { Button } from '../../ui/button'
import { setAllAdminJobs } from '../../../redux/jobSlice'

const adminJobsTable = () => {

  const navigate = useNavigate();

  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true
      }

      const filterText = job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.location.toLowerCase().includes(searchJobByText.toLowerCase());
      return filterText;
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const deleteJobHandler = async (jobId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${JOB_API_END_POINT}/deleteadminjobs/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        const updatedJobs = allAdminJobs.filter(job => job._id !== jobId);
        dispatch(setAllAdminJobs(updatedJobs));
        setDialogOpen(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to delete job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='overflow-x-auto appliedJobsTableScrollbar'>
        <Table>
          <TableCaption className='pb-5 md:pb-3'>A list of your recent posted jobs</TableCaption>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead>Company Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {
              filterJobs?.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell className='font-semibold'>{job?.title}</TableCell>
                  <TableCell>{job?.location}</TableCell>
                  <TableCell>{new Date(job?.createdAt).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell className='text-right'>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className='cursor-pointer' />
                      </PopoverTrigger>
                      <PopoverContent className='w-fit p-0 mr-2'>
                        <div className='flex flex-col justify-center p-1'>
                          <div onClick={() => { navigate(`/${job?._id}/update`) }} className='flex gap-2 items-center justify-center w-full cursor-pointer py-1 px-4 hover:bg-gray-100 rounded'>
                            <Edit2 className='w-4' />
                            <span className='text-base'>Edit</span>
                          </div>

                          <div className='h-[1px] bg-gray-400 my-1'></div>

                          <div onClick={() => { navigate(`/admin/jobs/${job?._id}/applicants`) }} className='flex gap-2 items-center justify-center w-full cursor-pointer py-1 px-4 hover:bg-gray-100 rounded'>
                            <Eye className='w-4' />
                            <span className='text-base'>Applicants</span>
                          </div>

                          <div className='h-[0.5px] bg-gray-400 my-1'></div>

                          <div>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                              <DialogTrigger asChild>
                                <div className='flex gap-2 items-center justify-center w-full cursor-pointer text-red-600 py-1 px-4 hover:bg-gray-100 rounded'>
                                  <Trash2 className='w-4' />
                                  <span className='text-base'>Delete</span>
                                </div>
                              </DialogTrigger>

                              <DialogContent className="sm:max-w-xl rounded-lg" onInteractOutside={(e) => e.preventDefault()} aria-describedby=''>
                                <DialogHeader>
                                  <DialogTitle className='text-center md:text-xl sm:text-lg text-base text-purple-800 px-5'>
                                    <span><span className='text-red-700 font-bold'>{job?.title}</span> job posted by <span className='text-red-700 font-bold'>{job?.company?.name}</span></span>
                                  </DialogTitle>
                                </DialogHeader>

                                <h1 className='md:text-lg sm:text-base text-sm font-medium text-center my-3'>Are you sure you want to delete this Job?</h1>

                                <DialogFooter>
                                  <div className="flex flex-col sm:flex-row items-center md:justify-end gap-2 w-full">
                                    <DialogClose asChild>
                                      <Button type='button' variant='outline' className='border-gray-400 lg:w-1/6 md:1/3 sm:1/2 w-full sm:order-first order-last'>Cancel</Button>
                                    </DialogClose>

                                    <Button onClick={() => deleteJobHandler(job?._id)} className='bg-red-600 hover:bg-red-700 lg:w-1/6 md:1/3 sm:1/2 w-full' disabled={loading}>
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

export default adminJobsTable
