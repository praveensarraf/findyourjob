import React from 'react'
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const currentYear = new Date().getFullYear();

const Copyright = () => {

    const socialMedia = [
        { platform: "Facebook", link: "https://www.facebook.com/ImPraveenSarraf/", icon: <i className="fa-brands fa-facebook"></i> },
        { platform: "Instagram", link: "https://www.instagram.com/praveensarraf_/", icon: <i className="fa-brands fa-instagram"></i> },
        { platform: "X (Twitter)", link: "https://www.x.com", icon: <i className="fa-brands fa-x-twitter"></i> },
        { platform: "YouTube", link: "https://www.youtube.com", icon: <i className="fa-brands fa-youtube"></i> },
        { platform: "LinkedIn", link: "https://www.linkedin.com/in/praveen96650/", icon: <i className="fa-brands fa-linkedin"></i> },
        { platform: "GitHub", link: "https://github.com/praveensarraf", icon: <i className="fa-brands fa-github"></i> }
    ];

    return (
        <>
            <div className='flex sm:flex-row flex-col items-center justify-between bg-purple-300 py-1 px-5'>
                <div className="text-center text-xs sm:order-1 order-3">
                    <p>
                        © Copyright @{currentYear} - <a href="mailto:praveen96650@gmail.com" target='_blank' className='font-semibold text-purple-900 hover:text-purple-950 hover:underline'>Find your Job</a> | All rights reserved.
                    </p>
                </div>

                <div className='w-[95%] h-[0.5px] mx-auto bg-purple-950 opacity-30 order-2 mb-3 sm:hidden'></div>

                <ul className="flex items-center justify-center gap-3 sm:text-lg text-xl sm:order-2 order-1 py-2 sm:py-0">
                    {socialMedia.map(({ platform, link, icon }, index) => (
                        <li key={index} className="opacity-90 text-purple-900 hover:opacity-100 hover:text-purple-950">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a href={link} target="_blank" rel="noopener noreferrer">
                                            {icon}
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-purple-300 text-purple-950 border-purple-950 px-2 py-1">
                                        <p>{platform}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='bg-purple-800 text-purple-200 text-xs text-center'>
                <p>
                    Developed with <span className='text-red-600 text-sm'>❤</span> by <a href="https://praveensarraf.netlify.app/" target='_blank' className='text-white hover:text-purple-300 hover:underline'>Praveen Kumar</a>
                </p>
            </div>
        </>
    )
}

export default Copyright
