import React, { useState } from 'react'
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../../utils/constant'
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);

                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Server Error. Please try again!');
        }
    };

    return (
        <>
            <main className="flex flex-col min-h-screen">
                <nav>
                    <Navbar />
                </nav>

                <section className="flex-1">
                    <div className="max-w-7xl md:mx-auto mx-2 my-10 p-5 rounded-2xl 
                                    bg-white dark:bg-zinc-950 
                                    border border-purple-900 dark:border-slate-700 
                                    shadow-md shadow-purple-950 dark:shadow-purple-800">
                        <div className="mt-5 mb-10">
                            <h1 className="font-bold md:text-2xl text-lg text-center dark:text-slate-100">
                                Your Company Name
                            </h1>
                            <p className="text-muted-foreground md:text-base text-sm text-center my-2 dark:text-slate-400">
                                What would you like to name your company? This will be the name that appears on your company's profile page. You can change it later if you want.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label className="dark:text-slate-200">
                                Company Name<span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                placeholder="Enter your company name"
                                onChange={(e) => setCompanyName(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') registerNewCompany(e); }}
                                className="dark:bg-gray-900 dark:border-slate-600 dark:text-slate-200 placeholder:dark:text-slate-500"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 items-center sm:justify-end my-5 w-full">
                            <Button
                                variant="outline"
                                onClick={() => navigate('/admin/companies')}
                                className="w-full sm:w-1/6 lg:w-1/12 order-last sm:order-first 
                                           border-gray-400 dark:border-slate-600 
                                           dark:text-slate-200 dark:hover:bg-gray-900"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={registerNewCompany}
                                className="w-full sm:w-1/6 lg:w-1/12 
                                           bg-purple-800 hover:bg-purple-900 
                                           dark:bg-purple-700 dark:hover:bg-purple-800 dark:text-white"
                            >
                                Continue
                            </Button>
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

export default CompanyCreate
