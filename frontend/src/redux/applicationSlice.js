import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: [],
        
    },
    reducers: {
        // actions
        setApplicants: (state, action) => {
            state.applicants = action.payload;
        },

        setStatus: (state, action) => {
            const { id, status } = action.payload;
            const application = state.applicants.applications.find(app => app._id === id);
            if (application) {
                application.status = status;
            }
        },
    }
});

export const { setApplicants, setStatus } = applicationSlice.actions;

export default applicationSlice.reducer;