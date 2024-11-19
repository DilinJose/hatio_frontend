import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Body from '../../components/body/body'
import { router } from '../../constants'
import { createTodos, deleteTodos, getProject, updateProject, updateTodos } from '../../redux/action/projectAction'
import { createSecretGist, generateMarkdown, saveToLocalFile } from '../../utils/gistSummery'
import { FaSpinner } from "react-icons/fa";

const Project = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [newTodo, setNewTodo] = useState('')
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedTodo, setEditedTodo] = useState('')
  const [currentEditingId, setCurrentEditingId] = useState(null)
  const [gistUrl, setGistUrl] = useState('');
  const token = import.meta.env.VITE_GIT_TOKEN

  const { project, loading } = useSelector((state) => state.projects)

  useEffect(() => {
    if (id) {
      dispatch(getProject(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (project?.title) {
      setEditedTitle(project.title)
    }
  }, [project?.title])

  const handleTitleSave = () => {
    if (editedTitle.trim() !== project.title) {
      dispatch(updateProject({ ...project, title: editedTitle.trim() }))
    }
    setIsEditingTitle(false)
  }

  const handleTodoSave = (todoId) => {
    const todo = project.todos.find((todo) => todo._id === todoId)
    if (editedTodo.trim() !== todo.description) {
      dispatch(updateTodos({ id, todo: { ...todo, description: editedTodo.trim() } }))
    }
    setCurrentEditingId(null)
  }

  const handleAddTodo = (e) => {
    e.preventDefault()

    const payload = {
      id,
      description: newTodo,
    }

    dispatch(createTodos(payload))
    setNewTodo('') // Clear the input after adding
  }

  const handleToggleTodo = (todoId) => {
    const todo = project.todos.find((todo) => todo._id === todoId)
    dispatch(updateTodos({ id, todo: { ...todo, status: !todo.status } }))
  }

  const handleDeleteTodo = (todoId) => {
    dispatch(deleteTodos({ id, todoId }))

  }

  const handleExport = async () => {
    const markdown = generateMarkdown(project);
    const fileName = project.title;

    // Save locally
    saveToLocalFile(markdown, fileName);

    // Create gist
    try {
      const url = await createSecretGist(markdown, fileName, token);
      setGistUrl(url);
      alert(`Gist created: ${url}`);
    } catch (error) {
      console.error('Failed to create gist:', error);
    }
  };

  return (
    <Body>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <FaSpinner className="animate-spin text-white text-4xl" />
        </div>
      )}
      <div className="max-w-4xl mx-auto w-full space-y-8 p-4">
        <div className='flex justify-between items-center'>
          <button
            onClick={() => navigate(router.Dashboard)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-gray-300 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-black border border-gray-300 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2">
              <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H4.5a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Export
          </button>

        </div>
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Project Title */}
          <div className="bg-black p-6 border-b border-gray-200">
            {isEditingTitle ? (
              <div className="flex items-center gap-2 relative" >
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onBlur={handleTitleSave}
                  onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
                  className="w-full bg-black text-xl font-bold px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex justify-start items-center gap-2 relative" >
                <h1
                  className="w-full text-xl font-bold cursor-pointer hover:bg-gray-500 p-2 rounded-md"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {project?.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                    />
                  </svg>
                </h1>

              </div>
            )}
          </div>

          {/* Todo Section */}
          <div className="p-6 space-y-6">
            {/* Add Todo Form */}
            <form onSubmit={handleAddTodo} className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Todo
              </button>
            </form>

            {/* Todo List */}
            <div className="space-y-2">
              {project?.todos?.map((todo) => (
                <div
                  key={todo._id}
                  className="flex items-center gap-3 p-4 bg-gray-500 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => handleToggleTodo(todo._id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    {currentEditingId === todo._id ? (
                      <input
                        type="text"
                        value={editedTodo}
                        onChange={(e) => setEditedTodo(e.target.value)}
                        onBlur={() => handleTodoSave(todo._id)}
                        onKeyPress={(e) => e.key === 'Enter' && handleTodoSave(todo._id)}
                        className="w-full bg-black text-xl font-bold px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div>
                        <span
                          className={`cursor-pointer relative flex items-center ${todo.status ? 'line-through text-black' : ''}`}

                        >
                          {todo.description}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white-400 absolute right-8 top-1/2 transform -translate-y-1/2"

                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={() => {
                              setCurrentEditingId(todo._id)
                              setEditedTodo(todo.description)
                            }}
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-800 absolute right-2 top-1/2 transform -translate-y-1/2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={() => handleDeleteTodo(todo._id)}
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>

                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {gistUrl && (
          <p>
            Gist URL: <a href={gistUrl} target="_blank" rel="noopener noreferrer">{gistUrl}</a>
          </p>
        )}
      </div>
    </Body>
  )
}

export default Project
