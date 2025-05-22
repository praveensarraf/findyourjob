import { useNavigate } from 'react-router-dom';
import { Badge } from '../../ui/badge';
import React from 'react';
import { Avatar, AvatarImage } from '../../ui/avatar';
import commonCompanyLogo from '../../../assets/common-companyLogo.png';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => navigate(`/description/${job?._id}`)}
        className="p-3 sm:p-4 lg:p-5 rounded-md shadow-md shadow-purple-900 bg-white border-2 border-gray-100 cursor-pointer hover:scale-105 hover:transition-transform hover:bg-transparent hover:border-purple-900 relative"
      >
        <div className="flex items-center gap-3 sm:gap-4 my-2">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || commonCompanyLogo}
              alt={`${job?.company?.name}'s Logo`}
            />
          </Avatar>
          <div className='text-nowrap overflow-hidden text-ellipsis'>
            <h1 className="font-semibold text-sm sm:text-base lg:text-lg text-nowrap overflow-hidden text-ellipsis">
              {job?.company?.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 text-nowrap overflow-hidden text-ellipsis">{job?.location}</p>
          </div>
        </div>

        <div className="mt-3 mb-10 text-nowrap overflow-hidden text-ellipsis">
          <h1 className="font-semibold text-base sm:text-lg text-purple-950 text-nowrap overflow-hidden text-ellipsis">{job?.title}</h1>
          <p className="text-xs sm:text-sm text-gray-700 truncate text-nowrap overflow-hidden text-ellipsis">{job?.description}</p>
        </div>

        <div className="flex flex-nowrap justify-around items-center gap-2 sm:gap-4 mt-4 absolute bottom-5 text-nowrap overflow-hidden text-ellipsis">
          <Badge className="bg-green-100 text-green-900 border-green-900 font-bold text-nowrap overflow-hidden text-ellipsis" variant="ghost">
            {`${job?.position} Positions`}
          </Badge>
          <Badge className="bg-blue-100 text-blue-900 border-blue-900 font-bold text-nowrap overflow-hidden text-ellipsis" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="bg-red-100 text-red-900 border-red-900 font-bold text-nowrap overflow-hidden text-ellipsis" variant="ghost">
            {`${job?.salary} LPA`}
          </Badge>
        </div>
      </div>
    </>
  );
};

export default LatestJobCards;