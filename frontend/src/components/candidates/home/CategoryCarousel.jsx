import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../../ui/carousel";
import { Button } from "../../ui/button";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../../redux/jobSlice';

const category = [
    "Frontend Developer",
    "MERN Stack Developer",
    "Backend Developer",
    "Full Stack Java Developer",
    "Data Scientist",
    "DevOps Engineer",
    "MEAN Stack Developer",
    "Wordpress Developer",
    "Web Developer",
    "Web Designer",
    "UI/UX Developer",
    "Product Engineer",
    "Customer Support Executive",
    "Business Development Manager",
    "Digital Marketing",
    "SEO Specialist",
    "Content Writer",
    "Graphic Designer",
    "Video Editor",
    "Photographer",
    "Data Analyst",
    "Data Engineer",
    "Cloud Engineer",
    "Cyber Security Specialist",
    "Network Engineer",
    "Full Stack Developer",
    "Database Administrator",
    "IT Project Manager",
    "IT Support Specialist",
    "IT Consultant",
    "IT Manager",
];

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    return (
        <div className="flex items-center justify-center w-full dark:bg-zinc-900">
            <Carousel className="lg:w-1/2 w-2/3">
                <CarouselPrevious className="text-purple-800 dark:text-purple-400" />
                <CarouselContent>
                    {category.map((item, index) => (
                        <CarouselItem key={index} className="basis-auto">
                            <Button
                                onClick={() => searchJobHandler(item)}
                                variant="outline"
                                className="rounded-full text-purple-900 dark:text-purple-200 border border-purple-800 dark:border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-700"
                            >
                                {item}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="text-purple-800 dark:text-purple-400" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
