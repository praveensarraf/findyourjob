import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import JobCard from './../jobs/JobCard';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../../../redux/jobSlice';
import { Button } from '../../ui/button';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Browse = () => {
  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(searchedQuery);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    setSearchQuery(searchedQuery);
  }, [searchedQuery]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredJobs(allJobs);
    } else {
      const filtered = allJobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, allJobs]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setSearchedQuery(query));
  };

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(searchQuery));
  };

  useEffect(() => {
    if (user && user.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  return (
    <main className="flex flex-col min-h-screen dark:bg-zinc-900 text-gray-900 dark:text-gray-200">
      <nav>
        <Navbar />
      </nav>

      <section className="flex-1">
        <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6">
          {/* Search Bar */}
          <div className="flex items-center w-[95%] md:w-[70%] sm:h-14 h-12 shadow-sm shadow-purple-900 dark:shadow-zinc-800 rounded-full mx-auto bg-white dark:bg-zinc-800 my-10">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Find your dream job"
              className="outline-none border-2 border-gray-300 border-r-0 border-r-transparent dark:border-zinc-600 h-full w-full bg-transparent rounded-l-full pl-5 focus-visible:border-purple-800 dark:focus-visible:border-purple-500 text-purple-900 dark:text-gray-200 text-sm sm:text-lg font-medium"
            />

            <Button
              onClick={searchJobHandler}
              className="rounded-r-full h-full w-1/12 sm:px-10 px-7 bg-purple-800 hover:bg-purple-900 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              <Search style={{ width: '22px', height: '22px' }} />
            </Button>
          </div>

          {/* Job Listings */}
          <h1 className="mb-4 text-lg sm:text-2xl font-semibold text-purple-800 dark:text-purple-400">
            {searchQuery !== ''
              ? `Search Result (${user ? filteredJobs.length : '0'})`
              : `All Jobs (${user ? filteredJobs.length : '0'})`}
          </h1>

          {user ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <div key={job._id}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h1 className="text-center text-base sm:text-xl font-medium text-muted-foreground dark:text-gray-300 min-h-40 my-20">
                Please{' '}
                <Link
                  to="/login"
                  className="text-purple-800 hover:text-purple-950 hover:underline dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Login
                </Link>{' '}
                to see your browsed jobs!
              </h1>
            </div>
          )}
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Browse;
