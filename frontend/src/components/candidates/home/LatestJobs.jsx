import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LatestJobs = () => {
    const { allJobs } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    return (
        <>
            <div className="max-w-7xl xl:mx-auto mx-2 my-10 sm:my-16 lg:my-20 p-5 
                bg-purple-200 dark:bg-zinc-800 rounded-md shadow-md dark:shadow-zinc-700"
            >
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center sm:text-left
                    text-gray-900 dark:text-gray-100"
                >
                    Latest & Top <span className="text-purple-800 dark:text-purple-400">Job Openings</span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 my-5">
                    {user ? (
                        allJobs.length <= 0 ? (
                            <h1 className="col-span-full text-lg font-medium text-center
                                text-gray-700 dark:text-gray-300"
                            >
                                No Jobs Found
                            </h1>
                        ) : (
                            allJobs.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                        )
                    ) : (
                        <h1 className="col-span-full text-base font-medium text-center sm:text-lg min-h-20 my-10
                            text-gray-700 dark:text-gray-300"
                        >
                            Please{' '}
                            <Link 
                                to="/login" 
                                className="text-purple-800 dark:text-purple-400 font-semibold hover:text-purple-950 dark:hover:text-purple-300 hover:underline"
                            >
                                Login
                            </Link>
                            {' '}to view latest jobs!
                        </h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default LatestJobs;
