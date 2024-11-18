import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import logo from "../../assets/todo.svg"
import { router } from "../../constants";
import { useDispatch } from "react-redux";
import { removeAllData } from "../../redux/slice/projectSlice";

const NavBar = () => {
    const appDispatch = useDispatch()
    const { currentUser, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                localStorage.clear();
                dispatch({ type: "SIGN_OUT" });
                appDispatch(removeAllData())
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error during sign-out:', error);
            });
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {currentUser && <Link><a>Projects</a></Link>}
                        </ul>
                    </div>
                    <div className="flex justify-center items-center">
                        <img className="m-0" src={logo} alt="" width="100" height="100" />
                        <a className="btn btn-ghost text-xl m-0">ToDo</a>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {currentUser && <Link to={router.Dashboard}><a>Projects</a></Link>}
                    </ul>
                </div>
                {
                    currentUser ?
                        <div className="navbar-end">
                            <a onClick={handleSignout} className="btn">Sign Out</a>
                        </div> :
                        <div className="navbar-end">
                            <a className="btn">Log In</a>
                        </div>
                }
            </div>
        </div>
    )
}

export default NavBar