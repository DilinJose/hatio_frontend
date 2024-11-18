import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: [],
    project: {},
}

export const ProjectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        setProject: (state, action) => {
            state.project = action.payload
        },
        removeAllData: (state, action) => {
            state.projects = []
            state.project = {}
        }
    },
})

export const { setProjects, setProject, removeAllData } = ProjectSlice.actions

export default ProjectSlice.reducer