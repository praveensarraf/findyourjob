import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { useSelector } from 'react-redux';

const NotFound = () => {

  const { user } = useSelector(store => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/invalidroute').catch((error) => {
      if (error?.response && error?.response?.status === 404) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Route does not exist!');
      }
    });
  }, [navigate]);

  useEffect(() => {
    axios.get('/api/invalidroute').catch((error) => {
      if (error?.response && error?.response?.status === 404) {
        console.log(error);
        toast.error(error?.response?.data?.message || 'Route does not exist!');
      }
    });
  }, [navigate]);

  return (
    <>
      <main className='flex flex-col min-h-screen'>
        <nav>
          <Navbar />
        </nav>

        <section className='flex-1 w-full'>
          <div className='text-center p-5 sm:p-10 w-full min-h-screen flex flex-col items-center justify-center gap-2'>
            <h1 className='sm:text-4xl text-2xl font-bold'>404 Not Found!</h1>
            <p className='sm:text-base text-sm'>Sorry.. The page you are looking for does not exist.</p>
            <Link to={!user || user.role !== 'recruiter' ? '/' : '/admin/companies'} className='font-semibold text-lg text-purple-800 hover:text-purple-900 hover:underline underline-offset-4 '>Go to Home</Link>
          </div>
        </section>

        <footer>
          <Footer />
        </footer>
      </main>
    </>
  );
};

export default NotFound;
