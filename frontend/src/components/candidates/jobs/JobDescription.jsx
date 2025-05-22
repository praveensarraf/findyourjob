import React, { useEffect } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { useSelector } from 'react-redux';
import useApplyJob from '../../../hooks/useApplyJob';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import useBookmarkJob from '../../../hooks/useBookmarkJob';
import useGetAllCompaniesByAll from '../../../hooks/useGetAllCompaniesByAll';


const JobDescription = () => {
    useGetAllCompaniesByAll();

    const { user } = useSelector(store => store.auth);
    const { singleJob } = useSelector((store) => store.job);
    const { allCompanies } = useSelector(store => store.company);

    const { id: jobId } = useParams();

    const { isApplied, applyJobHandler } = useApplyJob(jobId);
    const { bookmarkedJob, applyJBookmarkHandler } = useBookmarkJob(jobId);

    const navigate = useNavigate();

    const company = allCompanies.find((company) => company._id === singleJob.company);

    useEffect(() => {
        if (user && user.role === 'recruiter') {
            navigate('/admin/companies');
        }
    }, [user, navigate]);

    return (
        <>
            <main className="flex flex-col min-h-screen">
                <nav>
                    <Navbar />
                </nav>

                <section className="flex-1">
                    <div className="my-10 max-w-7xl lg:mx-auto bg-white p-5 mx-5 rounded-md shadow-md shadow-purple-400">
                        <div className="flex flex-col gap-6">
                            <div className='flex items-center justify-between'>
                                <Button
                                    onClick={() => navigate(-1)}
                                    variant="outline"
                                    type="button"
                                    className="flex items-center gap-2 font-semibold border-gray-300 text-gray-500 self-start"
                                >
                                    <ArrowLeft />
                                    <span>Back</span>
                                </Button>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button onClick={applyJBookmarkHandler} variant='outline' className={`w-10 h-10 sm:w-fit sm:h-fit rounded-full sm:rounded-lg ${bookmarkedJob ? '' : 'bg-purple-100 hover:bg-purple-200'}`}>
                                                {
                                                    bookmarkedJob ? (
                                                        <><BookmarkCheck /><span className='hidden sm:block'>Saved</span></>
                                                    ) : (
                                                        <><Bookmark /><span className='hidden sm:block'>Save</span></>
                                                    )
                                                }
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-purple-900 text-purple-200 border-purple-400 mr-2 sm:mr-0">
                                            <p>{bookmarkedJob ? 'Job bookmarked' : 'Bookmark job'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div>
                                <div className="flex flex-col sm:flex-row lg:justify-between gap-4">
                                    <div className="w-full">
                                        <h1 className="font-bold text-2xl lg:text-3xl text-purple-900">
                                            {singleJob?.title}
                                        </h1>

                                        <div className="flex flex-wrap items-center justify-center my-3 gap-2 w-fit">
                                            <Badge className="bg-green-100 text-green-900 border-green-900 font-semibold px-3 py-1" variant="ghost">
                                                {`${singleJob?.position} Positions`}
                                            </Badge>
                                            <Badge className="bg-blue-100 text-blue-900 border-blue-900 font-semibold px-3 py-1" variant="ghost">
                                                {singleJob?.jobType}
                                            </Badge>
                                            <Badge className="bg-red-100 text-red-900 border-red-900 font-semibold px-3 py-1" variant="ghost">
                                                {`${singleJob?.salary} LPA`}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={isApplied ? null : applyJobHandler}
                                        disabled={isApplied}
                                        className={`${isApplied
                                            ? 'bg-gray-600 cursor-not-allowed'
                                            : 'bg-purple-900 hover:bg-purple-950'
                                            }`}
                                    >
                                        {isApplied ? 'Already Applied' : 'Apply Now'}
                                    </Button>
                                </div>

                                <div className="font-semibold text-xl my-1 py-2 border-b-2 border-b-purple-200">
                                    <h2>Job Description</h2>
                                </div>

                                <div className="flex flex-col gap-4 my-5">
                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Role:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">{singleJob?.title}</span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Location:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {singleJob?.location}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Description:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {singleJob?.description}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Experience:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {`${singleJob?.experienceLevel} yrs`}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Salary:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {`${singleJob?.salary} LPA`}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-2">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Skills:</h1>
                                        <div className="flex flex-1 flex-wrap gap-2 font-medium text-purple-800 text-sm sm:text-base">
                                            {
                                                singleJob?.requirements.map((item, index) => (
                                                    <Badge key={index} className='bg-purple-50 text-purple-800 hover:bg-purple-100 px-3 py-1 text-sm rounded-full'>
                                                        {item}
                                                    </Badge>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <hr className='my-5' />

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Company Name:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {company?.name || '*Unknown*'}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">About Company:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {company?.description || '*Description not available*'}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Company Website:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {company?.website ? <a href={company.website} target='_blank' className='hover:underline hover:text-purple-900'>{company.website}</a> : '*Website not available*'}
                                        </span>
                                    </div>

                                    <hr className='my-5' />

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Total Applicants:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {singleJob?.applications.length}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-1">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Posted Date:</h1>
                                        <span className="flex flex-1 font-medium text-purple-800 text-sm sm:text-base">
                                            {new Date(singleJob?.createdAt).toLocaleDateString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer>
                    <Footer />
                </footer>
            </main>
        </>
    );
};

export default JobDescription;