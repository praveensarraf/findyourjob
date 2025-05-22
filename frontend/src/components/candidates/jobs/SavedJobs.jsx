import React, { useEffect, useState } from "react";
import Navbar from "./../../shared/Navbar";
import Footer from "./../../shared/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../../utils/constant";
import JobCard from "./JobCard";

const SavedJobs = () => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getBookmarkedJobs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${USER_API_END_POINT}/bookmarks`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setBookmarkedJobs(res.data.bookmarkedJobs);
                }
            } catch (error) {
                console.error(error);
                toast.error(error?.response?.data?.message || "Failed to fetch bookmarks!");
            } finally {
                setLoading(false);
            }
        };

        getBookmarkedJobs();;
    }, []);

    const handleRemoveBookmark = (jobId) => {
        setBookmarkedJobs((prevJobs) =>
            prevJobs.filter((job) => job._id !== jobId)
        );
    };

    useEffect(() => {
        if (!user) {
            navigate("/");
        } else if (user.role === "recruiter") {
            navigate("/admin/companies");
        }
    }, [user, navigate]);

    return (
        <main className="flex flex-col min-h-screen">
            <nav>
                <Navbar />
            </nav>

            <section className="flex-1">
                <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6">
                    <h1 className="mb-4 text-lg sm:text-2xl font-semibold text-purple-800 text-center underline underline-offset-8">
                        Your Bookmarked Jobs ({bookmarkedJobs.length})
                    </h1>

                    {loading ? (
                        <div className="flex items-center justify-center text-xl font-semibold min-h-40 my-10">
                            <h1 className="p-3 rounded-lg border-2 border-purple-800 opacity-60 bg-purple-100 text-purple-900 text-sm sm:text-xl text-center">
                                Loading bookmarks...
                            </h1>
                        </div>
                    ) : bookmarkedJobs.length === 0 ? (
                        <div className="flex items-center justify-center text-xl font-semibold min-h-40 my-10">
                            <h1 className="p-3 rounded-lg border-2 border-purple-800 opacity-60 bg-purple-100 text-purple-900 text-sm sm:text-xl text-center">
                                You haven't bookmarked any jobs yet!
                            </h1>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {bookmarkedJobs.map((job) => (
                                <div key={job._id}>
                                    <JobCard
                                        job={job}
                                        onBookmarkRemove={handleRemoveBookmark}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <footer>
                <Footer />
            </footer>
        </main>
    );
};

export default SavedJobs;
