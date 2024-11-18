import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    projects: [],
    project: {},
}

export const ProjectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        setProjects: (state, action) => {
            state.projects = action.payload
            state.loading = false
        },
        setProject: (state, action) => {
            state.project = action.payload
            state.loading = false
        },
        removeAllData: (state, action) => {
            state.projects = []
            state.project = {}
        }
    },
})

export const { startLoading, setProjects, setProject, removeAllData } = ProjectSlice.actions

export default ProjectSlice.reducer