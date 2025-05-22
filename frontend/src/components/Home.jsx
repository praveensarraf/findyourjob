import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import HeroSection from './candidates/home/HeroSection';
import CategoryCarousel from './candidates/home/CategoryCarousel';
import LatestJobs from './candidates/home/LatestJobs';
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();    // Custom Hook to get all jobs

  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies'); // Redirect to admin dashboard if recruiter
    }
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </>
  )
};

export default Home
