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
          <div className="text-center text-sm text-muted-foreground dark:text-gray-400">
            *You haven&apos;t applied to any jobs yet.*
          </div>
        ) : (
          <Table className="min-w-full bg-white dark:bg-zinc-950 rounded-lg shadow-sm dark:shadow-md">
            <TableCaption className="pb-10 sm:pb-4 text-gray-700 dark:text-gray-300">
              A list of your Applied Jobs
            </TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-purple-100 dark:hover:bg-purple-900/40">
                <TableHead className="text-gray-700 dark:text-purple-200">Applied Date</TableHead>
                <TableHead className="text-gray-700 dark:text-purple-200">Job Designation</TableHead>
                <TableHead className="text-gray-700 dark:text-purple-200">Company Name</TableHead>
                <TableHead className="text-right text-gray-700 dark:text-purple-200">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                allAppliedJobs.map((appliedJob) => (
                  <TableRow
                    key={appliedJob._id}
                    className="hover:bg-purple-200 dark:hover:bg-purple-900/40 transition-colors"
                  >
                    <TableCell className="text-gray-800 dark:text-gray-300">
                      {new Date(appliedJob?.createdAt).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell className="font-semibold whitespace-nowrap text-gray-900 dark:text-purple-100">
                      {appliedJob?.job?.title}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-gray-800 dark:text-gray-300">
                      {appliedJob?.job?.company?.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={
                          appliedJob?.status === 'rejected'
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : appliedJob?.status === 'pending'
                              ? 'bg-gray-500 hover:bg-gray-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                        }
                      >
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
