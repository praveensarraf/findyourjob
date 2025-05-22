import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import commonProfilePhoto from '../../assets/common-profilePhoto.png';
import { User2, LogOut, Menu, X, BookmarkCheck, Settings2, ChevronDown, ChevronRight, LockKeyhole, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import DeleteAccountConfirmation from './DeleteAccountConfirmation';


const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);

  const handleSetting = () => setSettingOpen(!settingOpen);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        setMenuOpen(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Failed to logout. Please try again!');
    }
  };

  return (
    <div className="bg-purple-200">
      <div className="flex items-center justify-between ml-5 mr-5 md:mr-14 h-14">
        <div className='flex items-center gap-5'>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center justify-center gap-5">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-purple-700 hover:text-purple-900"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to={user && user.role === 'jobSeeker' ? '/' : '/admin/companies'}>
            <h1 className="sm:text-xl text-base text-black font-bold">
              Find your <span className="text-purple-900 font-bold sm:text-3xl text-lg">Job</span>
            </h1>
          </Link>
        </div>

        <div className={`md:hidden ${!user ? 'hidden' : ''}`}>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto}
                          alt={`${user?.fullName}'s Photo`}
                        />
                      </Avatar>
                    </PopoverTrigger>

                    <PopoverContent className={`w-80 bg-purple-100 mr-2 ${!user ? 'hidden' : ''}`}>
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => user && user.role === 'jobSeeker' ? navigate('/profile') : navigate('/admin/profile')}>
                        <Avatar className="cursor-pointer">
                          <AvatarImage
                            src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto}
                            alt={`${user?.fullName}'s Photo`}
                          />
                        </Avatar>
                        <div className='text-nowrap overflow-hidden text-ellipsis'>
                          <h4 className="font-medium text-nowrap overflow-hidden text-ellipsis">{user?.fullName}</h4>
                          <p className="text-sm text-muted-foreground text-nowrap overflow-hidden text-ellipsis">{user?.profile?.bio}</p>
                        </div>
                      </div>

                      <div className="flex flex-col m-2 text-gray-700">
                        <div className="flex w-fit items-center cursor-pointer">
                          <User2 />
                          <Button variant="link">
                            <Link to={user && user.role === 'jobSeeker' ? '/profile' : '/admin/profile'}>View Profile</Link>
                          </Button>
                        </div>

                        <div className={`flex w-fit items-center cursor-pointer ${user && user.role === 'jobSeeker' ? 'block' : 'hidden'}`}>
                          <BookmarkCheck />
                          <Button variant="link">
                            <Link to='/bookmarks'>Saved Jobs</Link>
                          </Button>
                        </div>

                        <div>
                          <div className="flex w-fit items-center cursor-pointer">
                            <Settings2 />
                            <Button variant="link" onClick={handleSetting} className='flex items-center hover:no-underline'>
                              <span>Settings</span>
                              {settingOpen ? <ChevronDown /> : <ChevronRight />}
                            </Button>
                          </div>

                          <div className={`ml-5 ${settingOpen ? '' : 'hidden'}`}>
                            <Button onClick={() => navigate('/change-password')} variant='outline' className='bg-transparent border-none hover:bg-purple-200 rounded-none w-3/4 justify-start'><LockKeyhole />Change Password</Button>
                            <div className='w-3/4 my-2 h-[1px] bg-black opacity-30'></div>
                            <Button onClick={() => setIsDeleteAccountDialogOpen(true)} variant='outline' className='text-red-600 bg-transparent border-none hover:bg-purple-200 hover:text-red-600 rounded-none w-3/4 justify-start'><Trash2 />Delete Account</Button>
                          </div>
                        </div>

                        <div className="flex w-fit items-center cursor-pointer">
                          <LogOut />
                          <Button variant="link" onClick={logoutHandler}>Log Out</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent className="bg-purple-300 border-black py-1 px-2">
                  <p>{`${user?.fullName?.split(' ')[0]}'s Profile`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-16 flex-1 justify-end`}>
          <ul className="flex font-semibold text-lg items-center gap-10 text-purple-800">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="hover:text-purple-950"><Link to="/admin/companies">Companies</Link></li>
                <li className="hover:text-purple-950"><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li className="hover:text-purple-950"><Link to="/">Home</Link></li>
                <li className="hover:text-purple-950"><Link to="/jobs">Jobs</Link></li>
                <li className="hover:text-purple-950"><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {user ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto}
                          alt={`${user?.fullName}'s Photo`}
                        />
                      </Avatar>
                    </PopoverTrigger>

                    <PopoverContent className="w-80 bg-purple-100 mr-2">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => user && user.role === 'jobSeeker' ? navigate('/profile') : navigate('/admin/profile')}>
                        <Avatar className="cursor-pointer">
                          <AvatarImage
                            src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto}
                            alt={`${user?.fullName}'s Photo`}
                          />
                        </Avatar>
                        <div className='text-nowrap overflow-hidden text-ellipsis'>
                          <h4 className="font-medium text-nowrap overflow-hidden text-ellipsis">{user?.fullName}</h4>
                          <p className="text-sm text-muted-foreground text-nowrap overflow-hidden text-ellipsis">{user?.profile?.bio}</p>
                        </div>
                      </div>

                      <div className="flex flex-col m-2 text-gray-700">
                        <div className="flex w-fit items-center cursor-pointer">
                          <User2 />
                          <Button variant="link">
                            <Link to={user && user.role === 'jobSeeker' ? '/profile' : '/admin/profile'}>View Profile</Link>
                          </Button>
                        </div>

                        <div className={`flex w-fit items-center cursor-pointer ${user && user.role === 'jobSeeker' ? 'block' : 'hidden'}`}>
                          <BookmarkCheck />
                          <Button variant="link">
                            <Link to='/bookmarks'>Saved Jobs</Link>
                          </Button>
                        </div>

                        <div>
                          <div className="flex w-fit items-center cursor-pointer">
                            <Settings2 />
                            <Button variant="link" onClick={handleSetting} className='flex items-center hover:no-underline'>
                              <span>Settings</span>
                              {settingOpen ? <ChevronDown /> : <ChevronRight />}
                            </Button>
                          </div>

                          <div className={`ml-5 ${settingOpen ? '' : 'hidden'}`}>
                            <Button onClick={() => navigate('/change-password')} variant='outline' className='bg-transparent border-none hover:bg-purple-200 rounded-none w-3/4 justify-start'><LockKeyhole />Change Password</Button>
                            <div className='w-3/4 my-2 h-[1px] bg-black opacity-30'></div>
                            <Button onClick={() => setIsDeleteAccountDialogOpen(true)} variant='outline' className='text-red-600 bg-transparent border-none hover:bg-purple-200 hover:text-red-600 rounded-none w-3/4 justify-start'><Trash2 />Delete Account</Button>
                          </div>
                        </div>

                        <div className="flex w-fit items-center cursor-pointer">
                          <LogOut />
                          <Button variant="link" onClick={logoutHandler}>Log Out</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent className="bg-purple-300 border-black py-1 px-2">
                  <p>{`${user?.fullName?.split(' ')[0]}'s Profile`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex items-center gap-2">
              <Link to='/login'><Button variant='outline' className="text-purple-700 rounded-full font-semibold border-2 border-purple-700 hover:text-purple-900 hover:border-purple-900">Login</Button></Link>
              <Link to='/signup'><Button className="bg-purple-700 text-white rounded-full hover:bg-purple-900">Sign Up</Button></Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-14 left-0 w-full bg-purple-200 z-10 transform transition-all duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-[150%]'}`}>
          <ul className="flex flex-col font-semibold text-lg text-purple-800">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="hover:text-purple-950 p-2"><Link to="/admin/companies">Companies</Link></li>
                <li className="hover:text-purple-950 p-2"><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li className="hover:text-purple-950 p-2"><Link to="/">Home</Link></li>
                <li className="hover:text-purple-950 p-2"><Link to="/jobs">Jobs</Link></li>
                <li className="hover:text-purple-950 p-2"><Link to="/browse">Browse</Link></li>
              </>
            )}

            <hr />

            {!user ? (
              <div className="flex items-center justify-center gap-2 my-4">
                <Link to='/login'>
                  <Button variant='outline' className="text-purple-700 rounded-full font-semibold border-2 border-purple-700 hover:text-purple-900 hover:border-purple-900">
                    Login
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button className="bg-purple-700 text-white rounded-full hover:bg-purple-900">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-2 my-2 p-2">
                {/* <div className="flex items-center gap-2 w-full cursor-pointer">
                  <User2 />
                  <Button variant="link">
                    <Link to={user && user.role === 'jobSeeker' ? '/profile' : '/admin/profile'}>View Profile</Link>
                  </Button>
                </div>
                <div className={`flex items-center gap-2 w-full cursor-pointer ${user && user.role === 'jobSeeker' ? 'block' : 'hidden'}`}>
                  <BookmarkCheck />
                  <Button variant="link">
                    <Link to='/bookmarks'>Saved Jobs</Link>
                  </Button>
                </div> */}
                <div className="flex items-center gap-2 w-full cursor-pointer">
                  <LogOut />
                  <Button variant="link" onClick={logoutHandler}>Log Out</Button>
                </div>
              </div>
            )}
          </ul>
        </div>

      </div>

      {/* Dialog */}
      <DeleteAccountConfirmation open={isDeleteAccountDialogOpen} setOpen={setIsDeleteAccountDialogOpen} />
    </div>
  );
};

export default Navbar;
