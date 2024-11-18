// import { useNavigate } from 'react-router-dom';

// const ButtonWithTitle = ({
//     route,
//     title,
//     variant = 'default'
// }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(route);
//     };

//     const truncatedTitle = title?.length > 25 ? `${title?.slice(0, 12)}...` : title;

//     const baseStyles = "relative group flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 overflow-hidden";

//     const variants = {
//         default: "bg-slate-800 hover:bg-slate-700 border-2 border-slate-600",
//         primary: "bg-zinc-700 hover:bg-zinc-700 border-2 border-zinc-700",
//         success: "bg-green-800 hover:bg-green-700 border-2 border-green-600"
//     };

//     return (
//         <button
//             onClick={handleClick}
//             className={`
//         ${baseStyles}
//         ${variants[variant]}
//         w-full min-h-[160px]
//         transform hover:scale-[1.02] hover:-translate-y-1
//         shadow-lg hover:shadow-xl
//       `}
//         >
//             <div className="flex flex-col items-center gap-4">
//                 <span className="text-2xl md:text-xxl font-semibold text-white text-center line-clamp-2 p-2">
//                     {truncatedTitle}
//                 </span>
//             </div>

//             {/* Background glow effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//         </button>
//     );
// };

// export default ButtonWithTitle;

import { useNavigate } from 'react-router-dom';

const ButtonWithTitle = ({
    route,
    title,
    variant = 'default',
    onDelete  // Add this prop
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent navigation when clicking delete
        onDelete();
    };

    const truncatedTitle = title?.length > 25 ? `${title?.slice(0, 12)}...` : title;

    const baseStyles = "relative group flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300 overflow-hidden";

    const variants = {
        default: "bg-slate-800 hover:bg-slate-700 border-2 border-slate-600",
        primary: "bg-zinc-700 hover:bg-zinc-700 border-2 border-zinc-700",
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
                relative
            `}
        >
            {/* Delete button */}
            <div 
                className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-red-600/20 transition-colors"
                onClick={handleDelete}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-red-500 hover:text-red-400 transition-colors"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                    />
                </svg>
            </div>

            <div className="flex flex-col items-center gap-4">
                <span className="text-2xl md:text-xxl font-semibold text-white text-center line-clamp-2 p-2">
                    {truncatedTitle}
                </span>
            </div>

            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
    );
};

export default ButtonWithTitle;