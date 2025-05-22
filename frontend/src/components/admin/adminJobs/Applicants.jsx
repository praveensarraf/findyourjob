import React, { useEffect } from 'react'
import Navbar from '../../shared/Navbar'
import Footer from '../../shared/Footer'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../../utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../../redux/applicationSlice'
import { Button } from '../../ui/button'
import { ArrowLeft } from 'lucide-react'

const Applicants = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { applicants } = useSelector(state => state.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <>
            <main className='flex flex-col min-h-screen'>
                <nav>
                    <Navbar />
                </nav>

                <section className='flex-1'>
                    <div className='max-w-7xl md:mx-auto mx-2 my-10 p-5 rounded-2xl bg-white border border-purple-900 shadow-md shadow-purple-950'>
                        <div className='flex flex-col gap-3'>
                            <Button onClick={() => navigate(-1)} variant='outline' type='button' className='flex items-center gap-2 font-semibold border-gray-300 text-gray-500 self-start'>
                                <ArrowLeft />
                                <span>Back</span>
                            </Button>
                            <div className='self-center text-center'>
                                <h2 className='md:text-3xl sm:text-xl text-base font-bold text-purple-900 underline underline-offset-8'>Total Applicants <span>({applicants?.applications?.length})</span></h2>
                                <p className='mt-3 md:text-base sm:text-sm text-xs text-muted-foreground'>Here you can view all the applicants for your posted job</p>
                            </div>
                        </div>

                        <div className='mt-10 mb-6'>
                            <ApplicantsTable />
                        </div>
                    </div>
                </section>

                <footer>
                    <Footer />
                </footer>
            </main>

        </>
    )
}

export default Applicants
