import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const useApplyJob = (jobId) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.user);
    const { singleJob } = useSelector(store => store.job);

    const [isApplied, setIsApplied] = useState(false);

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);

                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };

                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error applying to job:", error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    const isUserApplied = res.data.job.applications.some(application => application.applicant === user?._id);
                    setIsApplied(isUserApplied);
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        if (user?._id) {
            fetchSingleJob();
        }
    }, [jobId, dispatch, user]);

    return { isApplied, applyJobHandler };
};

export default useApplyJob;
