import React, { useState } from 'react'
import Navbar from '../../shared/Navbar'
import Footer from '../../shared/Footer'
import { Label } from '../../ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../ui/select"
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../../utils/constant'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {

    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: ''
    });

    const [loading, setLoading] = useState(false);

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectCompanyHandler = (value) => {
        const selectedValue = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedValue._id });
    };

    const selectJobTypeHandler = (value) => {
        setInput({ ...input, jobType: value });
    };

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Failed to post job!');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <main className='flex flex-col min-h-screen'>
                <nav>
                    <Navbar />
                </nav>

                <section className='flex-1'>
                    <div className="max-w-3xl md:mx-auto mx-2 my-10 p-5 rounded-2xl bg-white border border-purple-900 shadow-md shadow-purple-950">

                        <div className="my-5 text-center">
                            <h2 className="text-3xl font-bold text-purple-900 underline">Find the Talent</h2>
                            <p className="mt-2 text-base text-muted-foreground">Post a job to find the best talent for your company</p>
                        </div>

                        <form
                            onSubmit={submitHandler}
                            onKeyDown={(e) => { if (e.key === 'Enter') { submitHandler(e); } }}
                            className="grid grid-cols-1 gap-x-7 gap-y-5 md:grid-cols-2 py-4"
                        >
                            <div className="flex flex-col gap-2">
                                <Label className="font-medium pl-1 text-purple-800">
                                    Select Company<span className="text-red-500">*</span>
                                </Label>
                                <Select onValueChange={selectCompanyHandler}>
                                    <SelectTrigger className="focus:ring-purple-900 border-gray-300">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Your registered companies</SelectLabel>
                                            {
                                                companies.length > 0 && companies.map((company) => (
                                                    <SelectItem key={company?._id} value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="title" className="font-medium pl-1 text-purple-800">
                                    Job Designation<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="Frontend Developer, Project Manager etc."
                                    className="border-gray-300"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="requirements" className="font-medium pl-1 text-purple-800">
                                        Requirements<span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-400 font-normal">(skills should be separated with comma)</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="requirements"
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        placeholder="Skills you are looking for"
                                        className="border-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="jobType" className="font-medium pl-1 text-purple-800">
                                    Job Type<span className="text-red-500">*</span>
                                </Label>
                                <Select onValueChange={selectJobTypeHandler}>
                                    <SelectTrigger className="focus:ring-purple-900 border-gray-300">
                                        <SelectValue placeholder="Select Job Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Full-Time" selected>Full-Time</SelectItem>
                                            <SelectItem value="Part-Time">Part-Time</SelectItem>
                                            <SelectItem value="Intern">Intern</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="location" className="font-medium pl-1 text-purple-800">
                                    Location<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="Enter job location"
                                    className="border-gray-300"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2 flex flex-col gap-5 md:flex-row">
                                <div className="flex flex-col gap-2 flex-1">
                                    <Label htmlFor="salary" className="font-medium pl-1 text-purple-800">
                                        Salary<span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-400 font-normal">(in LPA)</span>
                                    </Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        id="salary"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        placeholder="Total Package"
                                        className="border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <Label htmlFor="experience" className="font-medium pl-1 text-purple-800">
                                        Min. Experience<span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-400 font-normal">(in years)</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="experience"
                                        name="experience"
                                        value={input.experience}
                                        onChange={changeEventHandler}
                                        placeholder="Total Experience Range"
                                        className="border-gray-300"
                                    />
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <Label htmlFor="position" className="font-medium pl-1 text-purple-800">
                                        Position<span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        id="position"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        placeholder="Total openings"
                                        className="border-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                                <Label htmlFor="description" className="font-medium pl-1 text-purple-800">
                                    Description<span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    rows="6"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-purple-900 border-gray-300"
                                    placeholder="Enter about your requirements in details"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-2 my-5 col-span-1 md:col-span-2">
                                <Button onClick={() => navigate('/admin/jobs')} type="button" variant="outline" className="border-gray-400 w-full sm:w-1/3 md:w-1/6 order-last sm:order-first">Cancel</Button>
                                {
                                    loading ? (
                                        <Button type="button" className="bg-purple-900 w-full sm:w-1/3 md:w-1/6" disabled={loading}>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Please wait
                                        </Button>
                                    ) : (
                                        <Button type="submit" className="bg-purple-900 hover:bg-purple-950 w-full sm:w-1/3 md:w-1/6">Post Job</Button>
                                    )
                                }
                            </div>
                        </form>

                        {
                            companies.length <= 0 && <p className="text-center text-red-600 font-semibold text-xs my-2">*Please register the company before posting a job</p>
                        }
                    </div>
                </section>

                <footer>
                    <Footer />
                </footer>
            </main>
        </>
    )
}

export default PostJob
