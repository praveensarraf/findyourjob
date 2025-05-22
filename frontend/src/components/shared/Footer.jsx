import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ChevronsRight, Loader2, MailCheck } from 'lucide-react'
import Copyright from './Copyright'
import axios from 'axios';
import { EMAIL_API_END_POINT } from './../../utils/constant';
import { toast } from 'sonner';

const Footer = () => {

    const companyLinks = [
        { text: "Contact", link: "#" },
        { text: "News", link: "#" },
        { text: "Careers", link: "#" },
        { text: "Legal", link: "#" },
        { text: "Privacy Notice", link: "#" },
        { text: "Terms of Use", link: "#" },
    ];

    const quickLinks = [
        { text: "Support Center", link: "#" },
        { text: "Service Status", link: "#" },
        { text: "Security", link: "#" },
        { text: "Blog", link: "#" },
        { text: "Customers", link: "#" },
        { text: "Review", link: "#" },
    ];

    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${EMAIL_API_END_POINT}/send-email`, { email });
            if (res.data.success) {
                setResponseMessage(res.data.message);
                setEmail('');
                setLoading(false);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Failed to send email!');
        }finally{
            setLoading(false);
        }
    };

    return (
        <>
            <footer className="bg-purple-200">
                <svg
                    className="footer-wave-svg w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 100"
                    preserveAspectRatio="none"
                >
                    <path
                        className="footer-wave-path"
                        d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
                    ></path>
                </svg>

                <div className="bg-purple-200 w-full pt-10 pb-3 lg:px-10 md:px-7 px-5 grid grid-cols-5 gap-5">
                    <div className="w-full col-span-5 sm:col-span-3 lg:col-span-2 sm:pr-20">
                        <h1 className="text-3xl font-bold">
                            Find your <span className="text-purple-900 text-4xl">Job</span>
                        </h1>
                        <div className="my-2 w-full h-[1px] bg-purple-900"></div>
                        <p className="text-sm text-gray-700">
                            Your one-stop destination to find the perfect job or the ideal candidate with ease and efficiency. Join us today to bridge the gap between talent and opportunity. Find your purpose, Find your dream Job!
                        </p>
                    </div>

                    <div className="w-full col-span-5 sm:col-span-2 lg:col-span-1">
                        <h2 className="text-purple-800 font-semibold text-xl">Company</h2>
                        <ul className="my-2 space-y-2">
                            {companyLinks.map(({ text, link }, index) => (
                                <li key={index} className="opacity-70 hover:opacity-100">
                                    <a href={link} className="flex items-center">
                                        <ChevronsRight className="w-3 mr-1" /> {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full col-span-5 sm:col-span-2 lg:col-span-1">
                        <h2 className="text-purple-800 font-semibold text-xl">Quick Links</h2>
                        <ul className="my-2 space-y-2">
                            {quickLinks.map(({ text, link }, index) => (
                                <li key={index} className="opacity-70 hover:opacity-100">
                                    <a href={link} className="flex items-center">
                                        <ChevronsRight className="w-3 mr-1" /> {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full col-span-5 sm:col-span-3 md:col-span-2 lg:col-span-1">
                        <h2 className="text-purple-800 font-semibold text-xl">Let's Chat</h2>
                        <p className="mt-1">Have a support question?</p>
                        <div className="my-4">
                            <p className="text-sm pl-2">Get in Touch</p>
                            <form onSubmit={handleSubmit} className={`flex items-center w-full h-8 shadow-sm shadow-purple-900 rounded-full bg-white border-[1px] border-gray-400 relative focus-within:border-purple-800 ${responseMessage ? 'hidden' : ''}`}>
                                <input
                                    type="email"
                                    placeholder="Send your email id"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="outline-none border-none flex-1 pl-3 bg-transparent text-purple-900 text-sm h-full"
                                    required
                                />
                                <Button type='submit' className="rounded-r-full h-fit bg-purple-800 px-5 hover:bg-purple-900 absolute -right-1" disabled={loading}>
                                    {loading ? <span className='animate-spin'><Loader2/></span> : <MailCheck /> }
                                </Button>
                            </form>
                            { responseMessage && <p className='w-3/4 ml-2 text-center text-xs bg-green-50  text-green-800 font-medium mt-1 border border-green-800 p-1'>✉ Email sent successfully! ✓<br/>We'll get back to you soon.</p> }
                        </div>
                        <div>
                            <h2 className="text-sm">You can call us @</h2>
                            <p>
                                <a className="text-purple-900 text-lg font-medium hover:text-purple-800" href="tel:+910123456789">
                                    <i className="fa-solid fa-phone"></i> 01234-56789
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <Copyright />
            </footer>
        </>
    )
}

export default Footer