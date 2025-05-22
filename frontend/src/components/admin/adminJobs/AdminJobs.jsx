import React, { useEffect, useState } from 'react'
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../../redux/jobSlice';

const AdminJobs = () => {

    useGetAllAdminJobs();

    const [input, setInput] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    return (
        <>
            <main className='flex flex-col min-h-screen'>
                <nav>
                    <Navbar />
                </nav>

                <section className='flex-1'>
                    <div className='max-w-7xl md:mx-auto mx-2 my-10 p-5 rounded-2xl bg-white border border-purple-900 shadow-md shadow-purple-950 flex flex-col gap-5'>
                        <div className="flex flex-col md:flex-row items-center md:justify-between gap-2 md:my-3 md:px-10">
                            <Input type='search' onChange={(e) => setInput(e.target.value)} className='w-full md:w-1/3 lg:1/2 border-gray-400 order-last md:order-first' placeholder='Filter by name, designation or location' />
                            <div className='w-full h-[1px] bg-purple-950 opacity-40 order-2 md:hidden block mb-5'></div>
                            <Button onClick={() => navigate('/admin/jobs/create')} className='w-full md:w-1/6 bg-purple-900 hover:bg-purple-950 md:order-last'>Post New Job</Button>
                        </div>

                        <div className='w-full bg-purple-200 rounded-2xl p-5'>
                            <h1 className='text-center text-xl font-semibold text-purple-900 underline mb-5'>Posted Jobs</h1>

                            {/* A list of Jobs as Table posted by Admin */}
                            <AdminJobsTable/>
                            
                        </div>
                    </div>
                </section>

                <footer>
                    <Footer/>
                </footer>
            </main>
        </>
    )
}

export default AdminJobs