import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import CompaniesTable from '../adminHome/CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../../hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../../redux/companySlice';

const Companies = () => {
  useGetAllCompanies();

  const [input, setInput] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <nav>
          <Navbar />
        </nav>

        <section className="flex-1 py-5">
          <div className="max-w-7xl xl:mx-auto mt-5 mb-0 md:my-10 mx-2 p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-purple-900 shadow-md shadow-purple-950 flex flex-col md:gap-5 gap-2">
            <div className="flex flex-col md:flex-row items-center justify-between my-3 px-5 sm:px-10 gap-5">
              <Input
                type="search"
                onChange={(e) => setInput(e.target.value)}
                className="w-full xl:w-1/4 md:w-2/3 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 order-last md:order-first"
                placeholder="Filter by name or location"
              />
              <div className="w-full h-[1px] bg-purple-950 dark:bg-purple-200 opacity-40 order-2 md:hidden block mb-5"></div>
              <Button
                onClick={() => navigate('/admin/companies/create')}
                className="bg-purple-900 hover:bg-purple-950 text-white dark:bg-purple-700 dark:hover:bg-purple-800 w-full md:w-auto md:order-last"
              >
                Add New Company
              </Button>
            </div>

            <div className="w-full bg-purple-200 dark:bg-zinc-900 rounded-2xl p-5 overflow-x-auto">
              <h1 className="text-center text-xl font-semibold text-purple-900 dark:text-purple-400 underline mb-5">
                Registered Companies
              </h1>

              {/* Companies Table */}
              <CompaniesTable />
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

export default Companies;
