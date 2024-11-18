import axios from "axios";
import { deleteData, getData, postData, updateData } from "../../api/services"
import { setProject, setProjects, startLoading } from "../slice/projectSlice"
import { router } from "../../constants";
import { getUser } from "../../utils/getUser/getUser";


export const getProjects = (id) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await getData(`/projects`)
        dispatch(setProjects(response.data))
    } catch (error) {
        console.error(error)
    }
}
export const getProject = (id) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const response = await getData(`/projects/${id}`)
        dispatch(setProject(response.data))
    } catch (error) {
        console.error(error)
    }
}

export const createProjects = (data, navigate) => async (dispatch) => {
    try {
        const response = await postData('/projects', data)
        if (response.status === 200 || response.status === 201) {
            dispatch(getProjects())
            navigate(router.Dashboard)
        }
    } catch (error) {
        console.error(error)
    }
}

export const updateProject = (data) => async (dispatch) => {
    const { _id, ...rest } = data
    try {
        const response = await updateData(`/projects/${_id}`, rest)
        console.log('response :>> ', response);
        if (response.status === 200 || response.status === 201) {
            dispatch(getProject(_id))
        }
    } catch (error) {
        console.error(error)
    }
}

export const deleteProject = (id) => async (dispatch) => {
    try {
        const response = await deleteData(`/projects/${id}`)
        dispatch(getProjects())
    } catch (error) {
        console.error(error)
    }
}

export const createTodos = (data) => async (dispatch) => {
    const { id, ...rest } = data
    try {
        const response = await postData(`/projects/${id}/todos`, rest)
        if (response.status === 200 || response.status === 201) {
            dispatch(getProject(id))
        }
    } catch (error) {
        console.error(error)
    }
}

export const updateTodos = (data) => async (dispatch) => {

    const { id, todo } = data
    try {
        const response = await updateData(`/projects/${id}/todos/${todo._id}`,
            {
                description: todo.description,
                status: todo.status
            })
        if (response.status === 200 || response.status === 201) {
            dispatch(getProject(id))
        }
    } catch (error) {
        console.error(error)
    }
}

export const deleteTodos = (data) => async (dispatch) => {

    const { id, todoId } = data
    try {
        const response = await deleteData(`/projects/${id}/todos/${todoId}`)
        if (response.status === 200 || response.status === 201) {
            dispatch(getProject(id))
        }
    } catch (error) {
        console.error(error)
    }
}