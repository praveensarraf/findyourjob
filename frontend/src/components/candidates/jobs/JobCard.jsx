import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Button } from '../../ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { useNavigate } from 'react-router-dom';
import useApplyJob from '../../../hooks/useApplyJob';
import commonCompanyLogo from '../../../assets/common-companyLogo.png';
import useBookmarkJob from '../../../hooks/useBookmarkJob';
import useGetAllCompaniesByAll from './../../../hooks/useGetAllCompaniesByAll';
import { useSelector } from 'react-redux';


const JobCard = ({ job, onBookmarkRemove }) => {

    useGetAllCompaniesByAll();
    const { allCompanies } = useSelector(store => store.company);

    const navigate = useNavigate();

    const daysAgoFunction = (mongoDBTime) => {
        const createdAt = new Date(mongoDBTime);
        const currentDate = new Date();
        const timeDifference = Math.abs(currentDate - createdAt);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return 'Today';
        } else if (days === 1) {
            return 'Yesterday';
        } else {
            return `${days} days ago`;
        }
    };

    const { isApplied, applyJobHandler } = useApplyJob(job?._id);
    const { bookmarkedJob, applyJBookmarkHandler } = useBookmarkJob(job?._id);

    const removeBookmark = async () => {
        try {
            await applyJBookmarkHandler(job?._id);
            onBookmarkRemove(job?._id);
        } catch (error) {
            console.log(error);
        }
    }

    const company = allCompanies.find((company) => company._id === job?.company);


    return (
        <div className="p-3 sm:p-4 rounded-md shadow-md shadow-gray-500 bg-white border border-purple-300 hover:scale-[1.03] hover:transition-all hover:border-purple-950">
            {/* Top Row */}
            <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm text-muted-foreground">
                    {daysAgoFunction(job?.createdAt)}
                </p>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={removeBookmark} variant="outline" size="icon" className="rounded-full bg-transparent border-none hover:bg-purple-100 hover:text-purple-900">
                                {
                                    bookmarkedJob ? (
                                        <BookmarkCheck />
                                    ) : (
                                        <Bookmark />
                                    )
                                }
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-purple-900 text-purple-200 border-purple-400 mr-2 sm:mr-0">
                            <p>{bookmarkedJob ? 'Saved job' : 'Save for later'}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-2 sm:gap-3 my-2">
                <Avatar>
                    <AvatarImage
                        src={job?.company?.logo || company?.logo || commonCompanyLogo}
                        alt={`${job?.company?.name}'s Logo`}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                    />
                </Avatar>
                <div className='text-nowrap overflow-hidden text-ellipsis '>
                    <h1 className="text-sm sm:text-lg font-medium text-nowrap overflow-hidden text-ellipsis">{job?.company?.name || company?.name}</h1>
                    <p className="text-gray-600 text-xs sm:text-sm text-nowrap overflow-hidden text-ellipsis">{job?.location}</p>
                </div>
            </div>

            {/* Job Details */}
            <div className='text-nowrap overflow-hidden text-ellipsis'>
                <h1 className="font-semibold text-purple-900 text-lg sm:text-xl mt-3 mb-1 text-nowrap overflow-hidden text-ellipsis">{job?.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600 text-nowrap overflow-hidden text-ellipsis">
                    {job?.description}
                </p>
            </div>

            {/* Badges */}
            <div className="w-fit flex my-3 sm:flex-nowrap gap-2 sm:gap-3 text-nowrap overflow-hidden text-ellipsis">
                <Badge className="bg-green-100 text-green-900 border-green-900 text-center font-semibold text-nowrap" variant="ghost">{`${job?.position} Positions`}</Badge>
                <Badge className="bg-blue-100 text-blue-900 border-blue-900 text-center font-semibold text-nowrap" variant="ghost">{job?.jobType}</Badge>
                <Badge className="bg-red-100 text-red-900 border-red-900 text-center font-semibold text-nowrap" variant="ghost">{`${job?.salary} LPA`}</Badge>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mt-5 flex-wrap">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="text-purple-900 border-gray-300 w-full sm:w-auto"
                >
                    More Details
                </Button>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`${isApplied
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-purple-900 hover:bg-purple-950'
                        } w-full sm:w-auto`}
                >
                    {isApplied ? 'Applied' : 'Apply'}
                </Button>
            </div>
        </div>
    );
};

export default JobCard;
