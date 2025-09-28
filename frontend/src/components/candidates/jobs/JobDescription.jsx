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
                    <div className="my-10 max-w-7xl lg:mx-auto bg-white dark:bg-zinc-950 p-5 mx-5 rounded-md shadow-md shadow-purple-400 dark:shadow-zinc-700">
                        <div className="flex flex-col gap-6">
                            <div className='flex items-center justify-between'>
                                <Button
                                    onClick={() => navigate(-1)}
                                    variant="outline"
                                    type="button"
                                    className="flex items-center gap-2 font-semibold border-gray-300 dark:border-zinc-600 text-gray-500 dark:text-gray-100 dark:bg-zinc-800 self-start"
                                >
                                    <ArrowLeft />
                                    <span>Back</span>
                                </Button>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={applyJBookmarkHandler}
                                                variant='outline'
                                                className={`w-10 h-10 sm:w-fit sm:h-fit rounded-full sm:rounded-lg ${bookmarkedJob ? 'dark:bg-zinc-900 hover:dark:bg-zinc-800' : 'bg-purple-100 hover:bg-purple-200 dark:bg-zinc-900 dark:hover:bg-zinc-950'}`}
                                            >
                                                {bookmarkedJob ? <><BookmarkCheck /><span className='hidden sm:block'>Saved</span></> : <><Bookmark /><span className='hidden sm:block'>Save</span></>}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-purple-900 text-purple-200 dark:bg-purple-700 dark:text-purple-100 border-purple-400 mr-2 sm:mr-0">
                                            <p>{bookmarkedJob ? 'Remove bookmarked' : 'Bookmark job'}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <div>
                                <div className="flex flex-col sm:flex-row lg:justify-between gap-4">
                                    <div className="w-full">
                                        <h1 className="font-bold text-2xl lg:text-3xl text-purple-900 dark:text-purple-300">
                                            {singleJob?.title}
                                        </h1>

                                        <div className="flex flex-wrap items-center justify-center my-3 gap-2 w-fit">
                                            <Badge className="bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-200 border-green-900 dark:border-green-300 font-semibold px-3 py-1" variant="ghost">
                                                {`${singleJob?.position} Positions`}
                                            </Badge>
                                            <Badge className="bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-200 border-blue-900 dark:border-blue-300 font-semibold px-3 py-1" variant="ghost">
                                                {singleJob?.jobType}
                                            </Badge>
                                            <Badge className="bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-200 border-red-900 dark:border-red-300 font-semibold px-3 py-1" variant="ghost">
                                                {`${singleJob?.salary} LPA`}
                                            </Badge>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={isApplied ? null : applyJobHandler}
                                        disabled={isApplied}
                                        className={`${isApplied
                                            ? 'bg-gray-600 cursor-not-allowed dark:bg-gray-300'
                                            : 'bg-purple-900 hover:bg-purple-950 dark:bg-purple-700 dark:hover:bg-purple-800 dark:text-white'
                                            }`}
                                    >
                                        {isApplied ? 'Already Applied' : 'Apply Now'}
                                    </Button>
                                </div>

                                <div className="font-semibold text-xl my-1 py-2 border-b-2 border-b-purple-200 dark:border-b-purple-700">
                                    <h2>Job Description</h2>
                                </div>

                                <div className="flex flex-col gap-4 my-5 text-gray-900 dark:text-gray-100">
                                    {['Role', 'Location', 'Description', 'Experience', 'Salary'].map((label, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-1">
                                            <h1 className="w-full sm:w-[15%] font-semibold">{label}:</h1>
                                            <span className="flex flex-1 font-medium text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                                                {label === 'Role' && singleJob?.title}
                                                {label === 'Location' && singleJob?.location}
                                                {label === 'Description' && singleJob?.description}
                                                {label === 'Experience' && `${singleJob?.experienceLevel} yrs`}
                                                {label === 'Salary' && `${singleJob?.salary} LPA`}
                                            </span>
                                        </div>
                                    ))}

                                    <div className="flex flex-col md:flex-row gap-2">
                                        <h1 className="w-full sm:w-[15%] font-semibold">Skills:</h1>
                                        <div className="flex flex-1 flex-wrap gap-2 font-medium text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                                            {singleJob?.requirements.map((item, index) => (
                                                <Badge key={index} className='bg-purple-50 dark:bg-purple-700 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-600 px-3 py-1 text-sm rounded-full'>
                                                    {item}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className='my-5 border-gray-300 dark:border-gray-600' />

                                    {['Company Name', 'About Company', 'Company Website'].map((label, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-1">
                                            <h1 className="w-full sm:w-[15%] font-semibold">{label}:</h1>
                                            <span className="flex flex-1 font-medium text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                                                {label === 'Company Name' && (company?.name || '*Unknown*')}
                                                {label === 'About Company' && (company?.description || '*Description not available*')}
                                                {label === 'Company Website' && (company?.website ? <a href={company.website} target='_blank' className='hover:underline hover:text-purple-900 dark:hover:text-purple-200'>{company.website}</a> : '*Website not available*')}
                                            </span>
                                        </div>
                                    ))}

                                    <hr className='my-5 border-gray-300 dark:border-gray-600' />

                                    {['Total Applicants', 'Posted Date'].map((label, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-1">
                                            <h1 className="w-full sm:w-[15%] font-semibold">{label}:</h1>
                                            <span className="flex flex-1 font-medium text-purple-800 dark:text-purple-300 text-sm sm:text-base">
                                                {label === 'Total Applicants' && singleJob?.applications.length}
                                                {label === 'Posted Date' && new Date(singleJob?.createdAt).toLocaleDateString('en-IN')}
                                            </span>
                                        </div>
                                    ))}
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
