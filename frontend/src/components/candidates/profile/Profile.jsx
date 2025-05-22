import React, { useEffect, useState } from 'react'
import Navbar from '../../shared/Navbar'
import Footer from '../../shared/Footer'
import { Avatar, AvatarImage } from '../../ui/avatar'
import commonProfilePhoto from '../../../assets/common-profilePhoto.png'
import { Button } from '../../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip"
import { BookmarkCheck, Contact, Mail, Pen, ShieldCheck, File, ListChecks, Delete, Trash2} from 'lucide-react'
import { Badge } from '../../ui/badge'
import { Label } from '../../ui/label'
import AppliedJobsTable from './AppliedJobsTable'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../../../hooks/useGetAppliedJobs'
import UpdateProfilePhotoDialog from './UpdateProfilePhotoDialog'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate();

  useGetAppliedJobs();
  const { user } = useSelector(store => store.auth);

  const isResume = user?.profile?.resume;

  const [isPhotoDialogOpen, setIsPhotoDialogOpen] = useState(false);

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
          <div className='max-w-4xl md:mx-auto mx-2 bg-white border border-purple-300 rounded-2xl my-5 sm:p-8 px-5 py-2'>
            <div className='flex flex-col sm:flex-row sm:justify-between'>
              <div className='flex flex-col sm:flex-row items-center gap-5 sm:order-first order-2'>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Avatar className='w-24 h-24 sm:w-20 sm:h-20 cursor-pointer' onClick={() => setIsPhotoDialogOpen(true)}>
                          <AvatarImage src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto} alt={`${user?.fullName}'s Photo`} />
                        </Avatar>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className='bg-purple-900 text-purple-200 border-purple-400'>
                      <p>Edit Profile Photo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className='text-center sm:text-left'>
                  <h1 className='text-2xl font-semibold text-purple-900'>{user?.fullName}</h1>
                  <p className='text-gray-600'>{user?.profile?.bio}</p>
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='self-end sm:self-auto'>
                      <Button onClick={()=>navigate('/profile/edit')} className='mt-4 sm:mt-0 bg-purple-100 text-purple-900 rounded-full sm:rounded-md hover:bg-purple-200 flex items-center justify-center gap-1 sm:px-4 p-3'>
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

            <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6'>
              <h2 className='text-lg font-medium text-nowrap flex items-center gap-2'><ShieldCheck/><span>Skills :</span></h2>

              <div>
                {
                  user?.profile?.skills.length !== 0 ? (
                    <div className='flex flex-wrap gap-2'>
                      {
                        user?.profile?.skills.map((item, index) => (
                          <Badge key={index} className='bg-purple-200 text-purple-950 hover:bg-purple-300 px-3 py-1 text-sm rounded-full'>
                            {item}
                          </Badge>
                        ))
                      }
                    </div>
                  ) : (
                    <p className='text-muted-foreground text-xs'>
                      *No skills have been updated yet*
                    </p>
                  )
                }
              </div>
            </div>

            <div className='flex flex-col gap-0 sm:flex-row sm:items-center sm:gap-6 my-6'>
              <Label className='text-lg font-medium text-nowrap flex items-center gap-2'><File/><span>Resume :</span></Label>
              {
                isResume ? (
                  <a href={user?.profile?.resume} target='_blank' className='text-purple-800 hover:underline break-all'>{user?.profile?.resumeOriginalName}</a>
                ) : (
                  <p className='text-muted-foreground text-xs'>*No resume has been uploaded yet*</p>
                )
              }
            </div>

            <div className='max-w-full bg-purple-100 rounded-2xl mt-10 p-5'>
              <h1 className='text-center text-xl font-semibold text-purple-900 underline mb-5 flex items-center justify-center gap-2'><ListChecks/><span>Applied Jobs</span></h1>

              {/* Applied Jobs Table */}
              <AppliedJobsTable />
            </div>

            <div className='mt-5'>
              <Button variant='link' onClick={() => navigate('/bookmarks')} className='w-full sm:w-fit'><BookmarkCheck /><span>Saved Jobs</span></Button>
            </div>
          </div>

          {/* Dialog */}
          <UpdateProfilePhotoDialog open={isPhotoDialogOpen} setOpen={setIsPhotoDialogOpen} user={user} />

        </section>

        <footer>
          <Footer />
        </footer>

      </main>
    </>
  )
}

export default Profile
