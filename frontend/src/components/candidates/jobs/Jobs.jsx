import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import FilterCard from './FilterCard';
import JobCard from './JobCard';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '../../ui/button';

const Jobs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setIsFilterVisible(false);
  };

  useEffect(()=>{
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

        {user ? (
          <section className="flex-1 relative">
            <div className="w-full xl:w-[90%] mx-auto my-5 p-2">
              <div className="flex flex-col xl:flex-row gap-3">
                {/* Toggle Button for Filter Card */}
                <button
                  className="xl:hidden bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition"
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                  {isFilterVisible ? 'Hide Filters' : 'Filter Jobs'}
                </button>

                {/* Filter Card */}
                <div className={`w-full xl:w-[20%] lg:w-1/4 md:w-1/2 h-fit min-h-[800px] bg-white shadow-md rounded-md p-3 transition-all duration-500 transform ${isFilterVisible ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0 xl:block absolute xl:relative top-0 left-0 bottom-0 z-10 pb-10`}>
                  <div className="flex justify-between items-center">
                    <h1 className="text-center text-xl font-semibold text-purple-900">Filter Jobs</h1>
                    <button
                      className={`text-xl font-bold text-purple-700 ${!isFilterVisible && 'hidden'}`}
                      onClick={() => setIsFilterVisible(false)}
                    >
                      <X />
                    </button>
                  </div>
                  <div className="w-full h-[1px] bg-purple-300 mb-3"></div>

                  <div className="h-[85vh] overflow-y-auto jobsScrollBar">
                    <FilterCard
                      onApplyFilters={handleApplyFilters}
                    />
                  </div>

                  {/* Save Filters Button */}
                  <div className="my-4 text-center flex items-center justify-center gap-3 xl:hidden">
                    <Button variant='outline' onClick={() => setIsFilterVisible(!isFilterVisible)}>
                      Cancel
                    </Button>
                    <Button className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition" onClick={() => handleApplyFilters({})} >
                      Save Filters
                    </Button>
                  </div>
                </div>

                {/* Overlay for Filter Card */}
                {isFilterVisible && (
                  <div
                    className="absolute inset-0 bg-black opacity-50 xl:hidden z-[5]"
                    onClick={() => setIsFilterVisible(false)}
                  ></div>
                )}

                {/* Job Listings */}
                {filterJobs.length <= 0 ? (
                  <div className="flex flex-1 items-center justify-center text-xl font-semibold">
                    <h1 className="p-3 rounded-lg border-4 border-purple-800 opacity-60 bg-purple-100 text-purple-900">
                      No Jobs Found
                    </h1>
                  </div>
                ) : (
                  <div className="flex flex-1 h-[100vh] overflow-y-auto p-5 pt-8 jobsScrollBar">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filterJobs.map((job) => (
                        <div key={job?._id}>
                          <JobCard job={job} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="flex-1 flex items-center justify-center">
            <h1 className="text-center text-base font-medium text-muted-foreground sm:text-xl min-h-52 my-32">
              Please{' '}
              <Link
                to="/login"
                className="text-purple-800 hover:text-purple-950 hover:underline"
              >
                Login
              </Link>{' '}
              to view all the active jobs!
            </h1>
          </section>
        )}

        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
};

export default Jobs;
