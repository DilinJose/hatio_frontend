// import React, { useContext, useEffect } from 'react'
// import AddButton from '../../components/addButton/addButton'
// import { router, sub_router } from '../../constants'
// import Body from '../../components/body/body'
// import { useDispatch, useSelector } from 'react-redux'
// import { deleteProject, getProjects } from '../../redux/action/projectAction'
// import ButtonWithTitle from '../../components/buttonWithTitle/buttonWithTitle'
// import { AuthContext } from '../../context/AuthContext'
// import { FaSpinner } from "react-icons/fa";

// const Dashboard = () => {
//   const dispatch = useDispatch()
//   const { projects, loading } = useSelector((state) => state.projects)
//   const { currentUser } = useContext(AuthContext)

//   useEffect(() => {
//     dispatch(getProjects(currentUser?.uid))
//   }, [])

//   const handleDelete = (id) => {
//     dispatch(deleteProject(id))
//   }
//   return (
//     <Body>

//       <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 auto-rows-auto'>        <div>
//         <AddButton route={router.AddProject} variant={"primary"} />
//       </div>

//         {projects.map(({ title, _id }, index) => (
//           <div key={index}>
//             <ButtonWithTitle
//               route={`${sub_router.Project}/${_id}`}
//               title={title}
//               variant={"primary"}
//               onDelete={() => handleDelete(_id)}
//             />
//           </div>
//         ))}

//       </div>

//       {
//         loading &&
//         <div >
//           <div className="flex justify-center items-center ">
//             <FaSpinner className="animate-spin text-grey-900 text-4xl" />
//           </div>
//         </div>

//       }

//     </Body>

//   )
// }

// export default Dashboard

import React, { useContext, useEffect } from 'react'
import AddButton from '../../components/addButton/addButton'
import { router, sub_router } from '../../constants'
import Body from '../../components/body/body'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject, getProjects } from '../../redux/action/projectAction'
import ButtonWithTitle from '../../components/buttonWithTitle/buttonWithTitle'
import { AuthContext } from '../../context/AuthContext'
import { FaSpinner } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch()
  const { projects, loading } = useSelector((state) => state.projects)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    dispatch(getProjects(currentUser?.uid))
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteProject(id))
  }

  return (
    <Body>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <FaSpinner className="animate-spin text-white text-4xl" />
        </div>
      )}

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 auto-rows-auto'>
        <div>
          <AddButton route={router.AddProject} variant={"primary"} />
        </div>

        {projects.map(({ title, _id }, index) => (
          <div key={index}>
            <ButtonWithTitle
              route={`${sub_router.Project}/${_id}`}
              title={title}
              variant={"primary"}
              onDelete={() => handleDelete(_id)}
            />
          </div>
        ))}
      </div>
    </Body>
  )
}

export default Dashboard
