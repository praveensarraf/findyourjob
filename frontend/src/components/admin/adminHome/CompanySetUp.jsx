import React, { useEffect, useState } from 'react'
import Navbar from '../../shared/Navbar';
import Footer from '../../shared/Footer';
import { Button } from '../../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../../hooks/useGetCompanyById';
import { Textarea } from '../../ui/textarea';

const CompanySetUp = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: '',
    description: '',
    website: '',
    location: '',
    logo: null
  });

  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const logo = e.target.files?.[0];
    setInput({ ...input, logo });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.logo) {
      formData.append('logo', input.logo);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error updating company!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || '',
      description: singleCompany?.description || '',
      website: singleCompany?.website || '',
      location: singleCompany?.location || '',
      logo: singleCompany?.logo || null
    });
  }, [singleCompany]);

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <nav>
          <Navbar />
        </nav>

        <section className="flex-1">
          <div className="max-w-4xl md:mx-auto mx-2 my-10 md:p-10 p-5 rounded-2xl 
                          bg-white dark:bg-zinc-950 
                          border border-purple-900 dark:border-slate-700 
                          shadow-md shadow-purple-950 dark:shadow-purple-800">
            <form
              onSubmit={submitHandler}
              onKeyDown={(e) => { if (e.key === 'Enter') { submitHandler(e); } }}
            >
              <div className="flex flex-col gap-2 justify-between">
                <Button
                  onClick={() => navigate('/admin/companies')}
                  variant="outline"
                  type="button"
                  className="flex items-center gap-2 font-semibold 
                             text-muted-foreground dark:text-slate-400 
                             self-start border-gray-300 dark:border-slate-600 
                             hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <ArrowLeft />
                  <span>Back</span>
                </Button>

                <h1 className="font-bold text-xl md:text-2xl self-center 
                               text-purple-900 dark:text-slate-100 underline">
                  Company Setup
                </h1>
              </div>

              <div className="my-5 md:my-7 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-1">
                  <Label className="text-base font-medium text-purple-800 dark:text-slate-200" htmlFor="name">
                    Company Name :
                  </Label>
                  <Input
                    value={input?.name}
                    onChange={changeEventHandler}
                    type="text"
                    placeholder="Your Company Name"
                    name="name"
                    id="name"
                    className="col-span-4 dark:bg-gray-900 dark:border-slate-600 dark:text-slate-200 placeholder:dark:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-1">
                  <Label className="text-base font-medium text-purple-800 dark:text-slate-200" htmlFor="description">
                    Description:
                  </Label>
                  <Textarea
                    value={input?.description}
                    onChange={changeEventHandler}
                    rows="4"
                    placeholder="About your company"
                    name="description"
                    id="description"
                    className="col-span-4 focus-visible:ring-purple-900 
                               dark:bg-gray-900 dark:border-slate-600 dark:text-slate-200 placeholder:dark:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-1">
                  <Label className="text-base font-medium text-purple-800 dark:text-slate-200" htmlFor="location">
                    Location :
                  </Label>
                  <Input
                    value={input?.location}
                    onChange={changeEventHandler}
                    type="text"
                    placeholder="Company Location"
                    name="location"
                    id="location"
                    className="col-span-4 dark:bg-gray-900 dark:border-slate-600 dark:text-slate-200 placeholder:dark:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-1">
                  <Label className="text-base font-medium text-purple-800 dark:text-slate-200" htmlFor="website">
                    Website :
                  </Label>
                  <Input
                    value={input?.website}
                    onChange={changeEventHandler}
                    type="url"
                    placeholder="Company Website"
                    name="website"
                    id="website"
                    className="col-span-4 dark:bg-gray-900 dark:border-slate-600 dark:text-slate-200 placeholder:dark:text-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-1">
                  <Label className="text-base font-medium text-purple-800 dark:text-slate-200" htmlFor="logo">
                    Logo :
                  </Label>
                  <Input
                    onChange={changeFileHandler}
                    type="file"
                    accept="image/*"
                    name="logo"
                    id="logo"
                    className="col-span-4 dark:bg-gray-900 dark:border-slate-600 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="my-5 flex flex-col sm:flex-row items-center sm:justify-end gap-2">
                <Button
                  onClick={() => navigate('/admin/companies')}
                  variant="outline"
                  type="button"
                  className="border-gray-400 dark:border-slate-600 
                             w-full sm:w-1/6 sm:order-first order-last 
                             dark:text-slate-200 dark:hover:bg-gray-900"
                >
                  Cancel
                </Button>

                {loading ? (
                  <Button className="w-full sm:w-1/6 bg-purple-900 dark:bg-purple-700 dark:text-white" disabled={loading}>
                    <Loader2 className="h-4 w-4 animate-spin" /> wait
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full sm:w-1/6 bg-purple-900 hover:bg-purple-950 
                               dark:bg-purple-700 dark:hover:bg-purple-800 dark:text-white"
                  >
                    Update
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>

        <footer>
          <Footer />
        </footer>
      </main>
    </>
  )
}

export default CompanySetUp
