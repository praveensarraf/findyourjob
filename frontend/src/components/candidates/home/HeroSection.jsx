import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../../../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchedQuery);

  useEffect(() => {
    setQuery(searchedQuery);
  }, [searchedQuery]);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 dark:bg-zinc-900 text-gray-900 dark:text-gray-200">
      <h1 className="text-center text-lg sm:text-xl font-semibold bg-purple-300 dark:bg-purple-700 mt-4 sm:mt-6 px-4 rounded">
        India's No. 1 <span className="text-purple-950 dark:text-purple-200 text-xl sm:text-2xl font-bold">Job Portal</span> to unlock your career!
      </h1>

      <h1 className="flex flex-col items-center gap-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
        <span>Search, Apply &</span>
        <span className="text-purple-800 dark:text-purple-400">Get your Dream Job</span>
      </h1>

      <div className="text-base sm:text-lg text-center font-medium mt-2 text-gray-500 dark:text-gray-300">
        <p>
          Your one-stop destination to find the perfect job or the ideal candidate with ease and efficiency.
        </p>
        <p className="mt-2 sm:mt-1">
          Join us today to bridge the gap between talent and opportunity!
        </p>
      </div>

      <div className="flex items-center w-full md:w-3/4 lg:w-1/2 sm:h-14 h-11 shadow-sm shadow-purple-900 dark:shadow-zinc-800 rounded-full mx-auto bg-white dark:bg-zinc-800 my-3 lg:my-10">
        <input
          type="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your dream job"
          className="outline-none border-2 border-gray-300 border-r-0 dark:border-zinc-600 h-full w-full bg-transparent rounded-l-full pl-5 focus-visible:border-purple-800 dark:focus-visible:border-purple-500 text-purple-900 dark:text-gray-200 text-base sm:text-lg font-medium"
          onKeyDown={(e) => { if (e.key === 'Enter') { searchJobHandler(); } }}
        />

        <Button
          onClick={searchJobHandler}
          className="rounded-r-full h-full w-[20%] sm:w-1/12 px-6 sm:px-10 bg-purple-800 hover:bg-purple-900 dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          <Search style={{ width: '22px', height: '22px' }} />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
