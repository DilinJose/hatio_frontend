import { useContext, useState } from 'react'
import Body from '../../components/body/body'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProjects } from '../../redux/action/projectAction'
import { router } from '../../constants'
import { AuthContext } from '../../context/AuthContext'

const CreateProject = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [errors, setErrors] = useState({})

  const { currentUser } = useContext(AuthContext)

  const validation = () => {
    let tempErrors = {}

    if (!title.trim()) {
      tempErrors.title = "Project title is required"
    } else if (title.length < 3) {
      tempErrors.title = "Project title must be at least 3 characters"
    } else if (title.length > 50) {
      tempErrors.title = "Project title cannot exceed 50 characters"
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      uid: currentUser.uid,
      title
    }
    if (validation()) {
      dispatch(createProjects(payload, navigate))
    }
  }

  return (
    <Body>
      <>
        <button className="btn btn-accent" onClick={() => navigate(router.Dashboard)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
          Back
        </button>
      </>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl/9 font-bold text-gray-200">Create A Project</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="my-4 block text-sm/6 font-medium text-white-900">
                Project title
              </label>
              <input
                className="block w-full rounded-md border-0 p-2 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                type="text"
                name="title"
                placeholder="Enter project title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.title}
                </p>
              )}
            </div>
            <div className='grid place-items-center ' >
              <button
                className='w-full border border-grey-700 border-white px-5 py-2 rounded-lg bg-grey-500 hover:bg-black hover:border-black '
                type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>

      </div>
    </Body>
  )
}

export default CreateProject