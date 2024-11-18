import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth, db, provider } from '../../firebase/firebase';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleEmailSignUp = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values?.email, values?.password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: values.fullName });
            await setDoc(doc(db, "users", user.uid), values);
            toast.success("User registered Successfully");
            navigate("/login");
        } catch (error) {
            toast.error("User registration failed");
            console.error('Error signing up:', error);
            setError(true);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {
                fullName: user.displayName,
                email: user.email,
                uid: user.uid,
            });
            toast.success("User registered Successfully");
            navigate("/login");

        } catch (error) {
            toast.error("User registration failed");
            console.error('Error signing in with Google:', error);
        }
    };

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(7, 'Must be 7 characters or more')
            .required('Required'),
    });

    return (
        <div className="h-[80vh] mt-5 flex justify-center items-center flex-col  rounded-lg max-w-3xl w-full mx-auto p-6 bg-grey text-white shadow-md">
            <div className="w-full text-center mb-6">
                <h2 className="text-2xl font-bold">Sign Up</h2>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleEmailSignUp(values)}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full flex flex-col items-center space-y-4">
                        <div className="w-full">
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-white-700">Full Name</label>
                            <Field name="fullName" type="text" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Full Name" />
                            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="w-full">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white-700">Email</label>
                            <Field name="email" type="email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className="w-full">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white-700">Password</label>
                            <Field name="password" type="password" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {error && <p className="text-center text-red-500">Wrong email or password</p>}

                        <button type="submit" disabled={isSubmitting} className="w-1/2 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none">
                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </Form>
                )}
            </Formik>

            <button onClick={handleGoogleSignIn} className="w-1/2 py-2 mt-4 border border-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none flex justify-center items-center space-x-2">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262" fill="currentColor"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" /><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                <span>Continue with Google</span>
            </button>

            <div className="text-center mt-6">
                <p className='text-white'>Already have an account? <span className="text-blue-500 underline cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
            </div>
        </div>
    );
}

export default SignUp;
