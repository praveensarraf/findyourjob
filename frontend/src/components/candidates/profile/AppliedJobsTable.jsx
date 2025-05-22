import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobsTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto appliedJobsTableScrollbar">
      {
        allAppliedJobs.length <= 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            *You haven't applied to any jobs yet.*
          </div>
        ) : (
          <Table className="min-w-full">
            <TableCaption className='pb-10 sm:pb-4'>A list of your Applied Jobs</TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Applied Date</TableHead>
                <TableHead>Job Designation</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                allAppliedJobs.map((appliedJob) => (
                  <TableRow key={appliedJob._id} className="hover:bg-purple-200">
                    <TableCell>{new Date(appliedJob?.createdAt).toLocaleDateString('en-IN')}</TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">{appliedJob?.job?.title}</TableCell>
                    <TableCell className="whitespace-nowrap">{appliedJob?.job?.company?.name}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={
                        appliedJob?.status === 'rejected' ? 'bg-red-500 hover:bg-red-500' :
                          appliedJob?.status === 'pending' ? 'bg-gray-500 hover:bg-gray-500' :
                            'bg-green-500 hover:bg-green-500'}>
                        {appliedJob?.status?.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        )
      }
    </div>
  );
};

export default AppliedJobsTable;
