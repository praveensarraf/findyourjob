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
import ThemeToggle from "../ThemeToggle";

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
    <div className="bg-purple-200 dark:bg-zinc-800 transition-colors">
      <div className="flex items-center justify-between ml-5 mr-5 md:mr-14 h-14">
        <div className='flex items-center gap-5'>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center justify-center gap-5">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-purple-700 hover:text-purple-900 dark:text-white dark:hover:text-gray-300"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <Link to={user && user.role === 'jobSeeker' ? '/' : '/admin/companies'}>
            <h1 className="sm:text-xl text-base text-black dark:text-white font-bold">
              Find your <span className="text-purple-900 dark:text-purple-400 font-bold sm:text-3xl text-lg">Job</span>
            </h1>
          </Link>
        </div>

        {/* Mobile ThemeToggle + Avatar */}
        <div className='md:hidden flex items-start sm:gap-3 gap-1'>
          <ThemeToggle />

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

                      <PopoverContent className={`w-80 bg-purple-100 dark:bg-zinc-700 dark:text-white mr-2 ${!user ? 'hidden' : ''}`}>
                        <div className="flex items-center gap-2 cursor-pointer"
                          onClick={() => user && user.role === 'jobSeeker' ? navigate('/profile') : navigate('/admin/profile')}>
                          <Avatar className="cursor-pointer">
                            <AvatarImage
                              src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto}
                              alt={`${user?.fullName}'s Photo`}
                            />
                          </Avatar>
                          <div className='text-nowrap overflow-hidden text-ellipsis'>
                            <h4 className="font-medium">{user?.fullName}</h4>
                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                          </div>
                        </div>

                        <div className="flex flex-col m-2 text-gray-700 dark:text-gray-200">
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
                              <Button onClick={() => navigate('/change-password')}
                                variant='outline'
                                className='bg-transparent border-none hover:bg-purple-200 dark:hover:bg-zinc-600 rounded-none w-3/4 justify-start'>
                                <LockKeyhole />Change Password
                              </Button>
                              <div className='w-3/4 my-2 h-[1px] bg-black dark:bg-gray-500 opacity-30'></div>
                              <Button onClick={() => setIsDeleteAccountDialogOpen(true)}
                                variant='outline'
                                className='text-red-600 bg-transparent border-none hover:bg-purple-200 dark:hover:bg-zinc-600 hover:text-red-600 rounded-none w-3/4 justify-start'>
                                <Trash2 />Delete Account
                              </Button>
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
                  <TooltipContent className="bg-purple-300 dark:bg-zinc-600 dark:text-white border-black py-1 px-2">
                    <p>{`${user?.fullName?.split(' ')[0]}'s Profile`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex items-center gap-16 flex-1 justify-end`}>
          <ul className="flex font-semibold text-lg items-center gap-10 text-purple-800 dark:text-white">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="hover:text-purple-950 dark:hover:text-gray-300"><Link to="/admin/companies">Companies</Link></li>
                <li className="hover:text-purple-950 dark:hover:text-gray-300"><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li className="hover:text-purple-950 dark:hover:text-gray-300"><Link to="/">Home</Link></li>
                <li className="hover:text-purple-950 dark:hover:text-gray-300"><Link to="/jobs">Jobs</Link></li>
                <li className="hover:text-purple-950 dark:hover:text-gray-300"><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          <div className='flex items-center gap-2'>
            <ThemeToggle />

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

                      <PopoverContent className="w-80 bg-purple-100 dark:bg-zinc-700 dark:text-white mr-2">
                        <div className="flex items-center gap-2 cursor-pointer"
                          onClick={() => user && user.role === 'jobSeeker' ? navigate('/profile') : navigate('/admin/profile')}>
                          <Avatar className="cursor-pointer">
                            <AvatarImage
                              src={user?.profile?.profilePhoto ? user?.profile?.profilePhoto : commonProfilePhoto}
                              alt={`${user?.fullName}'s Photo`}
                            />
                          </Avatar>
                          <div className='text-nowrap overflow-hidden text-ellipsis'>
                            <h4 className="font-medium">{user?.fullName}</h4>
                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                          </div>
                        </div>

                        <div className="flex flex-col m-2 text-gray-700 dark:text-gray-200">
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
                              <Button onClick={() => navigate('/change-password')}
                                variant='outline'
                                className='bg-transparent border-none hover:bg-purple-200 dark:hover:bg-zinc-500 rounded-none w-3/4 justify-start'>
                                <LockKeyhole />Change Password
                              </Button>
                              <div className='w-3/4 my-2 h-[1px] bg-black dark:bg-gray-500 opacity-30'></div>
                              <Button onClick={() => setIsDeleteAccountDialogOpen(true)}
                                variant='outline'
                                className='text-red-600 dark:text-red-500 bg-transparent border-none hover:bg-purple-200 dark:hover:bg-zinc-600 hover:text-red-600 rounded-none w-3/4 justify-start'>
                                <Trash2 />Delete Account
                              </Button>
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
                  <TooltipContent className="bg-purple-300 dark:bg-zinc-600 dark:text-white border-black py-1 px-2">
                    <p>{`${user?.fullName?.split(' ')[0]}'s Profile`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div className="flex items-center gap-2">
                <Link to='/login'><Button variant='outline' className="text-purple-700 dark:text-white rounded-full font-semibold border-2 border-purple-700 dark:border-gray-400 hover:text-purple-900 hover:border-purple-900 dark:hover:text-gray-300">Login</Button></Link>
                <Link to='/signup'><Button className="bg-purple-700 text-white rounded-full hover:bg-purple-900 dark:bg-purple-600 dark:hover:bg-purple-700">Sign Up</Button></Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-14 left-0 w-full bg-purple-200 dark:bg-zinc-800 dark:text-white z-10 transform transition-all duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-[150%]'}`}>
          <ul className="flex flex-col font-semibold text-lg text-purple-800 dark:text-white">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="hover:text-purple-950 dark:hover:text-gray-300 p-2"><Link to="/admin/companies">Companies</Link></li>
                <li className="hover:text-purple-950 dark:hover:text-gray-300 p-2"><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li className="hover:text-purple-950 dark:hover:text-gray-300 p-2"><Link to="/">Home</Link></li>
                <li className="hover:text-purple-950 dark:hover:text-gray-300 p-2"><Link to="/jobs">Jobs</Link></li>
                <li className="hover:text-purple-950 dark:hover:text-gray-300 p-2"><Link to="/browse">Browse</Link></li>
              </>
            )}

            <hr className="border-gray-400 dark:border-gray-600" />

            {!user ? (
              <div className="flex items-center justify-center gap-2 my-4">
                <Link to='/login'>
                  <Button variant='outline' className="text-purple-700 dark:text-white rounded-full font-semibold border-2 border-purple-700 dark:border-gray-400 hover:text-purple-900 hover:border-purple-900 dark:hover:text-gray-300">
                    Login
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button className="bg-purple-700 text-white rounded-full hover:bg-purple-900 dark:bg-purple-600 dark:hover:bg-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-2 my-2 p-2">
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
