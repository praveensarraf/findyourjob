import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '../../../redux/jobSlice';

const FilterCard = () => {
    const { allJobs } = useSelector((store) => store.job);
    const [filterData, setFilterData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [experienceRange, setExperienceRange] = useState(0);

    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, experienceRange]);

    useEffect(() => {
        const title = [...new Set(allJobs.map((job) => job.title))].map(
            (str) => str.charAt(0).toUpperCase() + str.slice(1)
        );
        const locations = [...new Set(allJobs.map((job) => job.location))].map(
            (str) => str.charAt(0).toUpperCase() + str.slice(1)
        );

        setFilterData([
            {
                filterType: 'Job Title',
                dataArray: title,
            },
            {
                filterType: 'Location',
                dataArray: locations,
            },
            {
                filterType: 'Salary',
                dataArray: [
                    '0-2 LPA',
                    '2-5 LPA',
                    '5-10 LPA',
                    '10-20 LPA',
                    '20-50 LPA',
                    'More than 50 LPA',
                ],
            },
        ]);
    }, [allJobs]);

    return (
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            <div className="flex items-center space-x-2 my-3">
                <RadioGroupItem value="" id="allJobs" />
                <Label htmlFor="allJobs" className="cursor-pointer text-gray-900 dark:text-gray-100">
                    All Jobs
                </Label>
            </div>

            {filterData.map((filter, index) => (
                <div key={index}>
                    <h1 className="text-lg font-semibold mt-1 mb-2 text-purple-900 dark:text-purple-300">
                        {filter.filterType}
                    </h1>
                    {filter.dataArray.map((data, idx) => {
                        const dataId = `id${index}-${idx}`;
                        return (
                            <div className="flex items-center space-x-2 mb-3" key={dataId}>
                                <RadioGroupItem value={data} id={dataId} />
                                <Label htmlFor={dataId} className="cursor-pointer text-gray-900 dark:text-gray-100">
                                    {data}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Experience Range Input */}
            <div>
                <h1 className="text-lg font-semibold mt-4 mb-2 text-purple-900 dark:text-purple-300">
                    Experience (Years)
                </h1>
                <div className="flex items-center space-x-2">
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={experienceRange}
                        onChange={(e) => setExperienceRange(e.target.value)}
                        className="w-3/4 accent-purple-600 dark:accent-purple-400"
                    />
                    <span className="text-xl font-medium text-purple-900 dark:text-purple-300">{experienceRange}</span>
                </div>
            </div>
        </RadioGroup>
    );
};

export default FilterCard;
