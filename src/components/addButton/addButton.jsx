// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const AddButton = ({route}) => {
//     const navigate = useNavigate()
//     const handleClick = () => {
//         navigate(route)
//     }
//     return (
//         <div>
//             <button
//                 className={`border border-white text-center rounded-lg font-semibold text-4xl w-60 h-40`}
//                 onClick={handleClick}
//             >
//                 +
//             </button>
//         </div>
//     )
// }

// export default AddButton

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonWithTitle = ({
    route,
    title,
    variant = 'default'
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    const baseStyles = "relative group flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 overflow-hidden";

    const variants = {
        default: "bg-slate-800 hover:bg-slate-700 border-2 border-slate-600",
        primary: "bg-zinc-800 hover:bg-zinc-800 border-2 border-zinc-900",
        success: "bg-green-800 hover:bg-green-700 border-2 border-green-600"
    };

    return (
        <button
            onClick={handleClick}
            className={`
        ${baseStyles}
        ${variants[variant]}
        w-full min-h-[160px]
        transform hover:scale-[1.02] hover:-translate-y-1
        shadow-lg hover:shadow-xl
      `}
        >
            <div className="flex flex-col items-center gap-4">
                <span className="text-2xl md:text-2xl font-semibold text-white text-center line-clamp-2">
                    Add Project +
                </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
    );
};

export default ButtonWithTitle;