import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const useBookmarkJob = (jobId) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.auth.user);
  const [bookmarkedJob, setBookmarkedJob] = useState(false);

  const applyJBookmarkHandler = async () => {
    try {
      if (!bookmarkedJob) {
        // Add bookmark
        const res = await axios.post(
          `${USER_API_END_POINT}/bookmark/${jobId}`,
          {},
          { withCredentials: true }
        );

        if (res.data.success) {
          setBookmarkedJob(true);
          const updatedUser = {
            ...user,
            bookmarkedJobs: [...user.bookmarkedJobs, jobId],
          };
          dispatch(setUser(updatedUser));
          toast.success(res.data.message);
        }
      } else {
        // Remove bookmark
        const res = await axios.delete(
          `${USER_API_END_POINT}/bookmark/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setBookmarkedJob(false);
          const updatedUser = {
            ...user,
            bookmarkedJobs: user.bookmarkedJobs.filter((id) => id !== jobId),
          };
          dispatch(setUser(updatedUser));
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Check if the job is already bookmarked
  useEffect(() => {
    if (user?.bookmarkedJobs?.includes(jobId)) {
      setBookmarkedJob(true);
    } else {
      setBookmarkedJob(false);
    }
  }, [user, jobId]);

  return { bookmarkedJob, applyJBookmarkHandler };
};

export default useBookmarkJob;
