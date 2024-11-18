import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth, provider } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import { setProjects } from '../../redux/slice/projectSlice';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)
    const [error, setError] = useState(false)

    const handleEmailSignUp = async (values) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            dispatch({ type: "LOGIN", payload: user })
            toast.success("Login Successfull")
            navigate("/")
        }
        catch (error) {
            setError(true)
            toast.error("Login Failed")
            console.error('Error Login:', error);
        }
    };

    // Function to handle Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            dispatch({ type: "LOGIN", payload: user })
            toast.success("Login Successfull")
            user && navigate("/")
        } catch (error) {
            setError(true)
            toast.error("Login Failed")
            console.error('Error signing in with Google:', error);
        }
    };

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(7, 'Must be 7 characters or more')
            .required('Required'),
    })

    return (
        <div className="h-[80vh] mt-5 flex justify-center items-center flex-col  rounded-lg max-w-3xl w-full mx-auto p-6 bg-grey text-white shadow-md">
            <div className="w-full text-center mb-6">
                <h2>Login In</h2>
            </div>

            {/* <div className="w-50 my-4"> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleEmailSignUp(values)}
            >
                {({ isSubmitting }) => (
                    <Form className="w-1/2 flex flex-col items-center space-y-4">
                        <div className="w-full">

                            <div className="mb-3">
                                <Field name="email" type="email" className="form-control p-2 border rounded w-full" placeholder="Enter your email" />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>

                            <div className="mb-3">
                                <Field name="password" type="password" className="form-control p-2 border rounded w-full" placeholder="Enter your password" />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>

                            {error && <p className="text-center text-red-500">Wrong email or password</p>}

                            <div className="grid gap-2 w-full">
                                <button
                                    type="submit"
                                    className="btn p-2 text-white bg-[#90aead] rounded hover:bg-gray-600"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Logging in...' : 'LogIn'}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* </div> */}

            <>
                <div>
                    <p className="text-center">Or</p>
                </div>

                <div className="flex justify-center items-center w-full p-3 rounded">
                    <div className="grid gap-2 w-1/2">
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn p-2 bg-white text-black border border-gray-400 hover:bg-gray-600 focus:outline-none rounded flex justify-center items-center"
                        >
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                                <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                                <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                                <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" />
                                <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>
                </div>

                <div className="w-3/4 flex justify-center items-center cursor-pointer">
                    <p>
                        Don’t have an account?{' '}
                        <span
                            className="underline text-blue-500"
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </>
        </div>

    )
}

export default LoginForm